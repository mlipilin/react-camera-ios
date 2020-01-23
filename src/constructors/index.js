export const createConstraints = deviceId => ({
    video: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
    },
});

export const createVideoDevice = ({ deviceId = null, side = null, deviceInfo = null } = {}) => ({
    deviceId,
    deviceInfo,
    side,
});
