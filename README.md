[![GitHub Actions](https://github.com/mlipilin/react-camera-ios/workflows/Run%20tests/badge.svg)](https://github.com/mlipilin/transfermarkt-parser/actions)

# React Camera iOS

A simple react implementation of iPhone / iPad photo camera with all native styles and ability to change camera (user / environment).

The following technologies were used to create the library:

- WebRTC for getting the access to camera media stream,
- HTML `<video>` element for display the camera stream,
- HTML `<canvas>` element for taking a screenshot (photo) from the `<video>` element.

## Installation

You can install the library using NPM:

```
npm install react-camera-ios
```

or Yarn:

```
yarn add react-camera-ios
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Camera, { DEVICE, FACING_MODE, PLACEMENT } from 'react-camera-ios';

// Styles
import 'react-camera-ios/build/styles.css';

const containerStyle = { display: 'flex', height: '300px', width: '300px' };

ReactDOM.render(
  <div style={containerStyle}>
    <Camera
      device={DEVICE.MOBILE}
      facingMode={FACING_MODE.ENVIRONMENT}
      placement={PLACEMENT.COVER}
      quality="1"
      onError={error => console.log(error)}
      onTakePhoto={dataUrl => console.log(dataUrl)}
    />
  </div>,
  document.getElementById('root'),
);


```

## Constants

The library provides some constants, you can use them as values of camera properties:

```javascript
const DEVICE = {
  MOBILE: 'mobile',
  TAB: 'tab',
};

const FACING_MODE = {
  ENVIRONMENT: 'environment',
  USER: 'user',
};

const PLACEMENT = {
  CONTAIN: 'contain',
  COVER: 'cover',
};
```

## PropTypes
Name | Description | Type | Default value
--- | --- | --- | ---
**device**|Which style of camera do you want to see:<br>**DEVICE.MOBILE** - iPhone camera style,<br>**DEVICE.TAB** - iPad camera style.|*string*|`DEVICE.MOBILE`
**facingMode**| In which side of device do you want to open camera:<br>**FACING_MODE.ENVIRONMENT** - back (main) camera,<br>**FACING_MODE.USER** - front camera.<br>It works like [MediaTrackConstraints.facingMode](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode)|*string*|`FACING_MODE.ENVIRONMENT`
**isStarted**| Turn on camera | *bool* | `true`
**placement**|Camera placement relative to the container:<br>**PLACEMENT.CONTAIN** - scales the camera as large as possible without cropping,<br>**PLACEMENT.COVER** - scales the camera as large as possible (but if the proportions of the camera differ from the container, it is cropped either vertically or horizontally so that no empty space remains).<br>It works like [CSS background-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)|*string*|`PLACEMENT.COVER`
**quality**|The quality of photo (a number between 0 and 1). It will be passed to [canvas.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)|*number*|`0.92`
**onError(error)**|Called when an error is occured (error object will be passed as an agrument)|*func*|
**onTakePhoto(dataUrl)**|Called when a photo is taken (dataUrl will be passed as an argument)|*func*|


## Demo

[React Camera iOS](https://mlipilin.github.io/react-camera-ios/)
