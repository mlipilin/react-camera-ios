/* eslint-disable react/jsx-filename-extension */
// import Camera from './components/Camera';
// import { DEVICE, PLACEMENT, SIDE } from './constants';

// export { DEVICE, PLACEMENT, SIDE };
// export default Camera;

import React, { useState } from 'react';

export default function RRR() {
  const [clicks, setClicks] = useState(0);
  return (
    <button type="button" onClick={() => setClicks(clicks + 1)}>{clicks}</button>
  );
}
