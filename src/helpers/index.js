// Constants
import { REQUIRED_CONSTRAINTS } from '../constants';
import { BROWSER_NOT_SUPPORT_CONSTRAINTS, INSECURE_CONTEXT_ERROR } from '../constants/errors';

const CONSTRAINTS = {
    video: true,
    // video: {
    //     width: { min: 1280, ideal: 1280, max: 1920 },
    //     height: { min: 720, ideal: 720, max: 1080 },
    // },
};

export function checkConstraints() {
    return new Promise((resolve, reject) => {
        const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        const areAllConstraintsSupported = REQUIRED_CONSTRAINTS.every(
            c => supportedConstraints[c] === true,
        );

        if (!areAllConstraintsSupported) {
            reject(new Error(BROWSER_NOT_SUPPORT_CONSTRAINTS));
        }

        resolve();
    });
}

export function getMediaDevices() {
    return Promise.resolve(navigator.mediaDevices).then(mediaDevices => {
        if (mediaDevices === undefined) {
            throw new Error(INSECURE_CONTEXT_ERROR);
        }

        return mediaDevices;
    });
}

export function getVideoDevices(mediaDevices) {
    let stream = null;
    return mediaDevices
        .getUserMedia(CONSTRAINTS)
        .then(mediaStream => {
            stream = mediaStream;
            mediaDevices.enumerateDevices();
        })
        .then(filterDevices)
        .then(devices => ({ devices, stream }));
}

function filterDevices(devices) {
    return devices.filter(device => device.kind === 'videoinput');
}
