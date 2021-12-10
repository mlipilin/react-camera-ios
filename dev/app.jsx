import React, { useState } from 'react';

// Components
import Header from './components/Header';
import Settings from './components/Settings';

import Camera from '../src';

// Constants
import {
  DEFAULT_QUALITY, DEVICE, FACING_MODE, PLACEMENT, TURN,
} from '../src/constants';

import styles from './app.sass';

function App() {
  // Hooks
  const [settings, setSettings] = useState({
    device: DEVICE.MOBILE,
    facingMode: FACING_MODE.ENVIRONMENT,
    placement: PLACEMENT.COVER,
    quality: DEFAULT_QUALITY,
    turn: TURN.ON,
  });

  // Handlers
  function handleSettingsChange(key, value) {
    setSettings({ ...settings, [key]: value });
  }

  function handleCameraTakePhoto(dataURL) {
    const image = new Image();
    image.src = dataURL;
    const w = window.open('');
    w.document.write(image.outerHTML);
  }

  return (
    <div className={styles.App}>
      <header className={styles.App__Header}>
        <Header />
      </header>
      <aside className={styles.App__Sidebar}>
        <Settings {...settings} onChange={handleSettingsChange} />
      </aside>
      <main className={styles.App__Main}>
        <Camera
          device={settings.device}
          facingMode={settings.facingMode}
          isStarted={settings.turn === TURN.ON}
          placement={settings.placement}
          quality={settings.quality}
          onTakePhoto={handleCameraTakePhoto}
        />
      </main>
    </div>
  );
}

export default App;
