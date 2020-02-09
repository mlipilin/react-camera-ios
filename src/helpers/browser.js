// Constants
import { REQUIRED_CONSTRAINTS, SIDE } from '../constants';
import {
  BROWSER_NOT_SUPPORT_CONSTRAINTS,
  INSECURE_CONTEXT_ERROR,
  MEDIA_STREAM_HAS_NO_VIDEO_TRACKS,
  NO_CAMERA_ACCESS,
} from '../constants/errors';

// Constructors
import { createConstraints, createVideoDevice } from '../constructors';

// Helpers
import { getVideoVisibleSquare } from './size';

const enumerateDevices = () => navigator.mediaDevices.enumerateDevices();
const filterVideoDevices = (deviceInfos) => deviceInfos.filter((info) => info.kind === 'videoinput');

export const checkBrowserCapabilities = () => new Promise((resolve, reject) => {
  if (navigator.mediaDevices) {
    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    const areAllConstraintsSupported = REQUIRED_CONSTRAINTS.every(
      (c) => supportedConstraints[c] === true,
    );

    if (!areAllConstraintsSupported) {
      reject(new Error(BROWSER_NOT_SUPPORT_CONSTRAINTS));
    }
  } else {
    reject(new Error(INSECURE_CONTEXT_ERROR));
  }

  resolve();
});

export const getMediaStream = (deviceId = null) => navigator.mediaDevices
  .getUserMedia(createConstraints(deviceId)).then((mediaStream) => {
    if (!mediaStream) {
      throw new Error(NO_CAMERA_ACCESS);
    }
    if (mediaStream.getVideoTracks().length === 0) {
      throw new Error(MEDIA_STREAM_HAS_NO_VIDEO_TRACKS);
    }
    return mediaStream;
  });

export const getVideoDevices = () => getMediaStream()
  .then(enumerateDevices)
  .then(filterVideoDevices)
  // Detect camera side by deviceInfo label
  .then((deviceInfos) => deviceInfos.map((deviceInfo) => {
    let side = null;
    if (deviceInfo && typeof deviceInfo.label === 'string') {
      const label = deviceInfo.label.toLowerCase();
      if (label.includes('back')) {
        side = SIDE.BACK;
      } else if (label.includes('front')) {
        side = SIDE.FRONT;
      }
    }
    return createVideoDevice({ deviceId: deviceInfo.deviceId, deviceInfo, side });
  }))
  // Detect camera side by deviceInfo's videoTrack facingMode
  .then((deviceInfos) => {
    const hasDeviceInfosSide = deviceInfos.every((deviceInfo) => deviceInfo.side !== null);
    if (hasDeviceInfosSide) {
      return deviceInfos;
    }

    return Promise.all(deviceInfos.map(({ deviceId }) => getMediaStream(deviceId)))
      .then((mediaStreams) => mediaStreams.map((mediaStream) => {
        const videoTracks = mediaStream.getVideoTracks() || [];
        const hasVideoTrackSettings = Array.isArray(videoTracks)
                            && videoTracks.length > 0
                            && typeof videoTracks[0].getSettings === 'function';

        return hasVideoTrackSettings ? videoTracks[0].getSettings() || {} : {};
      }))
      .then((videoTracksSettings) => deviceInfos.map((deviceInfo, index) => {
        let { side } = deviceInfo;
        if (videoTracksSettings[index]) {
          if (videoTracksSettings[index].facingMode === 'environment') {
            side = SIDE.BACK;
          }
          if (videoTracksSettings[index].facingMode === 'user') {
            side = SIDE.FRONT;
          }
        }
        return createVideoDevice({ ...deviceInfo, side });
      }));
  });

export const getVideoScreenshot = (video, container, quality) => {
  const {
    sx, sy, sWidth, sHeight,
  } = getVideoVisibleSquare(video, container);

  const canvasElement = document.createElement('canvas');
  canvasElement.width = sWidth;
  canvasElement.height = sHeight;

  const ctx = canvasElement.getContext('2d');
  ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

  return canvasElement.toDataURL('image/jpeg', quality);
};
