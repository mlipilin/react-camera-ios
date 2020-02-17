export const createConstraints = (deviceId) => ({
  video: {
    deviceId: deviceId ? { exact: deviceId } : undefined,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
});

export const createVideoDevice = ({
  deviceId = null,
  facingMode = null,
  deviceInfo = null,
} = {}) => ({
  deviceId,
  deviceInfo,
  facingMode,
});
