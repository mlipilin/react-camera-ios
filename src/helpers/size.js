export const getVideoContainSize = ({
  containerWidth = 0,
  containerHeight = 0,
  videoWidth = 0,
  videoHeight = 0,
} = {}) => {
  if (containerWidth === 0 || containerHeight === 0 || videoWidth === 0 || videoHeight === 0) {
    return { width: 0, height: 0 };
  }

  let width = 0;
  let height = 0;
  const videoAspectRatio = videoWidth / videoHeight;
  const containerAspectRatio = containerWidth / containerHeight;

  if (videoAspectRatio < containerAspectRatio) {
    height = containerHeight;
    width = (height / videoHeight) * videoWidth;
  } else if (videoAspectRatio > containerAspectRatio) {
    width = containerWidth;
    height = (width / videoWidth) * videoHeight;
  } else {
    height = containerHeight;
    width = containerWidth;
  }

  return { width, height };
};

export const getVideoCoverSize = ({
  containerWidth = 0,
  containerHeight = 0,
  videoWidth = 0,
  videoHeight = 0,
} = {}) => {
  if (containerWidth === 0 || containerHeight === 0 || videoWidth === 0 || videoHeight === 0) {
    return { width: 0, height: 0 };
  }

  let width = 0;
  let height = 0;
  const videoAspectRatio = videoWidth / videoHeight;
  const containerAspectRatio = containerWidth / containerHeight;

  if (videoAspectRatio < containerAspectRatio) {
    width = containerWidth;
    height = (width / videoWidth) * videoHeight;
  } else if (videoAspectRatio > containerAspectRatio) {
    height = containerHeight;
    width = (height / videoHeight) * videoWidth;
  } else {
    height = containerHeight;
    width = containerWidth;
  }

  return { width, height };
};

export const getVideoVisibleSquare = (video, container) => {
  const videoVisibleSquareWidth = Math.min(video.offsetWidth, container.offsetWidth);
  const videoVisibleSquareHeight = Math.min(video.offsetHeight, container.offsetHeight);

  const visibleCoeffWidth = videoVisibleSquareWidth / video.offsetWidth;
  const visibleCoeffHeight = videoVisibleSquareHeight / video.offsetHeight;
  // alert(`${video.videoWidth} x ${video.videoHeight}`);
  const sWidth = video.videoWidth * visibleCoeffWidth;
  const sHeight = video.videoHeight * visibleCoeffHeight;

  const sx = (video.videoWidth - sWidth) / 2;
  const sy = (video.videoHeight - sHeight) / 2;

  return {
    sx, sy, sWidth, sHeight,
  };
};
