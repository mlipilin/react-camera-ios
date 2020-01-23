import React from 'react';

// Components
import Camera from './components/Camera';

import styles from './styles';

function App(props) {
    const {} = props;

    // Handlers
    function handleCameraTakePhoto(dataUri) {
        console.log('taken photo:', dataUri);
    }
    function handleCameraError(error) {
        console.log('handleCameraError', { error });
    }

    return (
        <>
            <Camera onError={handleCameraError} onTakePhoto={handleCameraTakePhoto} />
        </>
    );
}

export default App;
