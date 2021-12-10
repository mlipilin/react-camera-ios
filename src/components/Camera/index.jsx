import React, { useEffect, useRef, useState } from 'react';
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
    device, facingMode, isStarted, placement, quality, onError, onTakePhoto,
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
  function resizeVideo() {
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

      video.current.style.width = `${width}px`;
      video.current.style.height = `${height}px`;
    }
  }
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

  useEffect(() => {
    if (isStarted) {
      playVideo();
    } else {
      stopVideo();
    }
  }, [isStarted]);

  // Handlers
  function handleWindowResize() {
    resizeVideo();
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
      setActiveVideoDeviceId(
        getNextArrayItem(videoDevices.map((d) => d.deviceId), activeVideoDeviceId),
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
      if (activeVideoDeviceId && isStarted) {
        playVideo();
      }
    },
    [activeVideoDeviceId],
  );
  useEffect(
    () => {
      window.addEventListener('resize', handleWindowResize);
      if (mediaStream) {
        resizeVideo();
        setIsCameraInitialized(true);
      }
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    },
    [mediaStream],
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
  device: PropTypes.oneOf(Object.values(DEVICE)),
  facingMode: PropTypes.oneOf(Object.values(FACING_MODE)),
  isStarted: PropTypes.bool,
  placement: PropTypes.oneOf(Object.values(PLACEMENT)),
  quality: PropTypes.number,
  onError: PropTypes.func,
  onTakePhoto: PropTypes.func,
};
Camera.defaultProps = {
  device: DEVICE.MOBILE,
  facingMode: FACING_MODE.ENVIRONMENT,
  isStarted: true,
  placement: PLACEMENT.COVER,
  quality: DEFAULT_QUALITY,
  onError: () => {},
  onTakePhoto: () => {},
};

export default Camera;
