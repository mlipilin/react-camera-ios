import React, { useState } from 'react';

// Components
import Header from './components/Header';
import Settings from './components/Settings';

import Camera from '../src';

// Constants
import {
  DEFAULT_QUALITY, DEVICE, PLACEMENT, SIDE,
} from '../src/constants';

import styles from './app.sass';

function App() {
  // Hooks
  const [settings, setSettings] = useState({
    device: DEVICE.MOBILE,
    placement: PLACEMENT.COVER,
    quality: DEFAULT_QUALITY,
    side: SIDE.BACK,
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
          placement={settings.placement}
          quality={settings.quality}
          side={settings.side}
          onTakePhoto={handleCameraTakePhoto}
        />
      </main>
    </div>
  );
}

export default App;
