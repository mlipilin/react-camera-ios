import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Constants
import { DEVICE } from '../../constants';

import styles from './styles';

function CameraButtons(props) {
    const {
        changeCameraVisible,
        device,
        disabled,
        readOnly,
        onChangeCameraClick,
        onTakePhotoClick,
    } = props;

    // Handlers
    function handleChangeCameraClick(e) {
        e.preventDefault();
        onChangeCameraClick();
    }
    function handleTakePhotoClick(e) {
        e.preventDefault();
        onTakePhotoClick();
    }

    // Render props
    const componentClass = cn(styles.CameraButtons, {
        [styles.CameraButtons_mobile]: device === DEVICE.MOBILE,
        [styles.CameraButtons_readonly]: readOnly,
        [styles.CameraButtons_tab]: device === DEVICE.TAB,
    });
    const takePhotoClass = cn(styles.CameraButtons__TakePhoto, {
        [styles.CameraButtons__TakePhoto_mobile]: device === DEVICE.MOBILE,
        [styles.CameraButtons__TakePhoto_tab]: device === DEVICE.TAB,
    });
    const changeCameraClass = cn(styles.CameraButtons__ChangeCamera, {
        [styles.CameraButtons__ChangeCamera_mobile]: device === DEVICE.MOBILE,
        [styles.CameraButtons__ChangeCamera_tab]: device === DEVICE.TAB,
        [styles.CameraButtons__ChangeCamera_visible]: changeCameraVisible,
    });

    return (
        <div className={componentClass}>
            <button
                className={takePhotoClass}
                disabled={disabled}
                type="button"
                onClick={handleTakePhotoClick}
            >
                Take photo
            </button>
            <button
                className={changeCameraClass}
                disabled={disabled}
                type="button"
                onClick={handleChangeCameraClick}
            >
                Change
            </button>
        </div>
    );
}

CameraButtons.propTypes = {
    changeCameraVisible: PropTypes.bool,
    device: PropTypes.oneOf(Object.values(DEVICE)),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChangeCameraClick: PropTypes.func,
    onTakePhotoClick: PropTypes.func,
};
CameraButtons.defaultProps = {
    changeCameraVisible: false,
    device: DEVICE.MOBILE,
    disabled: false,
    readOnly: false,
    onChangeCameraClick: _ => _,
    onTakePhotoClick: _ => _,
};

export default CameraButtons;
