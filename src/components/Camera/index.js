import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Constants
import { CAMERA_TYPE, DEVICE, SIZE } from '../../constants';

// Helpers
import { checkConstraints, getMediaDevices, getVideoDevices } from '../../helpers';

import styles from './styles';

function Camera(props) {
    const { onError } = props;

    // State
    const [videoTracks, setVideoTracks] = useState([]);

    // Effects
    useEffect(() => {
        start();
    }, []);

    function start() {
        checkConstraints()
            .then(getMediaDevices)
            .then(getVideoDevices)
            .then(({ devices, stream }) => {
                console.log('devices', devices);
                console.log('stream', stream);
                // alert(devices.length);
                // var video = document.querySelector('video');
                // video.srcObject = devices[0];
                // video.onloadedmetadata = function(e) {
                //     video.play();
                // };
            })
            .catch(onError);
    }

    return (
        <div className={styles.Camera}>
            <div onClick={start}>CLICK</div>
            <video className={styles.Camera__Video} autoPlay playsInline />
        </div>
    );
}

Camera.propTypes = {
    cameraType: PropTypes.oneOf(Object.values(CAMERA_TYPE)),
    device: PropTypes.oneOf(Object.values(DEVICE)),
    quality: PropTypes.number,
    size: PropTypes.oneOf(Object.values(SIZE)),
    onError: PropTypes.func,
    onTakePhoto: PropTypes.func,
};
Camera.defaultProps = {
    cameraType: CAMERA_TYPE.REAR,
    device: DEVICE.MOBILE,
    quality: 1,
    size: SIZE.CONTAIN,
    onError: _ => _,
    onTakePhoto: _ => _,
};

export default Camera;
