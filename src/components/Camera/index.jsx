import React, {
  useCallback,
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import CameraButtons from '../CameraButtons';

// Constants
import {
  DEFAULT_QUALITY, DEVICE, PLACEMENT, FACING_MODE,
} from '../../constants';

// Helpers
import { getNextArrayItem } from '../../helpers/array';
import {
  checkBrowserCapabilities,
  getMediaStream,
  getVideoDevices,
  getVideoScreenshot,
} from '../../helpers/browser';
import { getVideoContainSize, getVideoCoverSize } from '../../helpers/size';

import styles from './styles.sass';

function getVideoDeviceIdBySide(videoDevices, facingMode) {
  const activeVideoDevice = facingMode
    ? videoDevices.find((videoDevice) => videoDevice.facingMode === facingMode)
    : null;
  return (activeVideoDevice || videoDevices[0]).deviceId;
}

function Camera(props) {
  const {
    device, facingMode, isTurnedOn, placement, quality, onChangeFacingMode, onError, onTakePhoto,
  } = props;

  // State
  const [activeVideoDeviceId, setActiveVideoDeviceId] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isCameraChanging, setIsCameraChanging] = useState(false);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isPhotoTaking, setIsPhotoTaking] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);

  // Refs
  const changingCamera = useRef(null);
  const container = useRef(null);
  const video = useRef(null);

  // Methods
  function init() {
    checkBrowserCapabilities()
      .then(getVideoDevices)
      .then(setVideoDevices)
      .catch((error) => {
        setHasError(true);
        onError(error);
      });
  }
  function playVideo() {
    setHasError(false);
    getMediaStream(activeVideoDeviceId)
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.onloadedmetadata = () => {
          video.current.play();
          setIsVideoPlaying(true);
        };
        return stream;
      })
      .then(setMediaStream)
      .catch(() => {
        setHasError(true);
      });
  }
  function stopVideo() {
    setIsVideoPlaying(false);
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((videoTrack) => {
        videoTrack.stop();
      });
    }
  }
  const resizeVideo = useCallback(() => {
    setTimeout(() => {
      const videoTracks = mediaStream ? mediaStream.getVideoTracks() : [];
      const videoTrack = videoTracks.length ? videoTracks[0] : null;

      if (videoTrack) {
        const { height: videoHeight, width: videoWidth } = videoTrack.getSettings();
        const {
          height: containerHeight,
          width: containerWidth,
        } = container.current.getBoundingClientRect();

        const getVideoSizeFn = placement === PLACEMENT.CONTAIN
          ? getVideoContainSize
          : getVideoCoverSize;

        const { width, height } = getVideoSizeFn({
          containerHeight,
          containerWidth,
          videoHeight,
          videoWidth,
        });

        video.current.style.height = `${height}px`;
        video.current.style.width = `${width}px`;
      }
    },
    300);
  }, [mediaStream, placement]);
  // };
  function reset() {
    setActiveVideoDeviceId(null);
    setHasError(false);
    setIsCameraChanging(false);
    setIsCameraInitialized(false);
    setIsPhotoTaking(false);
    setIsVideoPlaying(false);
    setMediaStream(null);
    setVideoDevices([]);
  }

  function handleTouchStart() {}
  function handleTakePhotoClick() {
    if (!isPhotoTaking) {
      setIsPhotoTaking(true);
      onTakePhoto(getVideoScreenshot(video.current, container.current, quality));
      setTimeout(() => {
        setIsPhotoTaking(false);
      }, 100);
    }
  }
  function handleChangeCameraClick() {
    changingCamera.current.style.backgroundImage = `url(${getVideoScreenshot(
      video.current,
      container.current,
      1,
    )})`;
    stopVideo();
    setIsCameraChanging(true);
    setTimeout(() => {
      const newVideoDeviceId = getNextArrayItem(videoDevices.map((d) => d.deviceId), activeVideoDeviceId);
      const newVideoDevice = videoDevices.find((d) => d.deviceId === newVideoDeviceId);
      if (newVideoDevice) {
        onChangeFacingMode(newVideoDevice.facingMode);
      }
      setActiveVideoDeviceId(
        newVideoDeviceId,
      );
      setIsCameraChanging(false);
      changingCamera.current.style.backgroundImage = 'none';
    }, 800);
  }

  // Effects
  useEffect(() => {
    init();
    return () => {
      stopVideo();
    };
  }, []);
  useLayoutEffect(() => {
    window.addEventListener('resize', resizeVideo);
    return () => {
      window.removeEventListener('resize', resizeVideo);
    };
  }, [resizeVideo]);
  useEffect(
    () => {
      if (isCameraInitialized) {
        stopVideo();
        reset();
        init();
      }
    },
    [placement, facingMode],
  );

  useEffect(
    () => {
      if (videoDevices.length) {
        setActiveVideoDeviceId(getVideoDeviceIdBySide(videoDevices, facingMode));
      }
    },
    [videoDevices.length],
  );
  useEffect(
    () => {
      if (activeVideoDeviceId && isTurnedOn) {
        playVideo();
      }
      if (!isTurnedOn) {
        stopVideo();
      }
    },
    [activeVideoDeviceId, isTurnedOn],
  );

  useEffect(
    () => {
      if (mediaStream) {
        setIsCameraInitialized(true);
        setTimeout(() => {
          resizeVideo();
        }, 200);
      }
    },
    [mediaStream, resizeVideo],
  );

  // Render props
  const videoClass = cn(styles.Camera__Video, {
    [styles.Camera__Video_playing]: isVideoPlaying,
  });
  const changingCameraOverlayClass = cn(styles.Camera__ChangingCameraOverlay, {
    [styles.Camera__ChangingCameraOverlay_visible]: isCameraChanging,
  });
  const photoTakingOverlayClass = cn(styles.Camera__PhotoTakingOverlay, {
    [styles.Camera__PhotoTakingOverlay_visible]: isPhotoTaking,
  });

  return (
  // onTouchStart needs for making ":active" pseudo-class works
  // https://stackoverflow.com/questions/17233804/how-to-prevent-sticky-hover-effects-for-buttons-on-touch-devices
    <div className={styles.Camera} onTouchStart={handleTouchStart}>
      <div className={videoClass} ref={container}>
        <video ref={video} autoPlay playsInline />
        <div className={photoTakingOverlayClass} />
        <div ref={changingCamera} className={changingCameraOverlayClass} />
      </div>
      <CameraButtons
        changeCameraVisible={videoDevices.length > 1}
        device={device}
        disabled={!isVideoPlaying || hasError}
        readOnly={isCameraChanging || isPhotoTaking}
        onChangeCameraClick={handleChangeCameraClick}
        onTakePhotoClick={handleTakePhotoClick}
      />
    </div>
  );
}

Camera.propTypes = {
  device: PropTypes.string,
  facingMode: PropTypes.string,
  isTurnedOn: PropTypes.bool,
  placement: PropTypes.string,
  quality: PropTypes.string,
  onChangeFacingMode: PropTypes.func,
  onError: PropTypes.func,
  onTakePhoto: PropTypes.func,
};

Camera.defaultProps = {
  device: DEVICE.MOBILE,
  facingMode: FACING_MODE.ENVIRONMENT,
  isTurnedOn: true,
  placement: PLACEMENT.COVER,
  quality: DEFAULT_QUALITY,
  onChangeFacingMode: (_) => _,
  onError: () => {},
  onTakePhoto: () => {},
};

export default Camera;
