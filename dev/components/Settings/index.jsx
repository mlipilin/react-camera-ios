import React from 'react';
import PropTypes from 'prop-types';

// Constants
import {
  DEFAULT_QUALITY, DEVICE, PLACEMENT, SIDE,
} from '../../../src/constants';

import styles from './styles.sass';

function Settings(props) {
  const {
    device, placement, quality, side, onChange,
  } = props;

  // Handlers
  const handleChange = (e) => {
    const key = e.target.name;

    let { value } = e.target;
    if (key === 'quality') {
      value = Number(value) || null;
    }

    onChange(key, value);
  };

  return (
    <form className={styles.Settings}>
      {/* Device */}
      <div className={styles.Settings__Control}>
        <div className={styles.Settings__ControlTitle}>Device:</div>
        <div className={styles.Settings__ControlInput}>
          {Object.values(DEVICE).map((value) => (
            <label key={value}>
              <input
                checked={value === device}
                name="device"
                type="radio"
                value={value}
                onChange={handleChange}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* Placement */}
      <div className={styles.Settings__Control}>
        <div className={styles.Settings__ControlTitle}>Placement:</div>
        <div className={styles.Settings__ControlInput}>
          {Object.values(PLACEMENT).map((value) => (
            <label key={value}>
              <input
                checked={value === placement}
                name="placement"
                type="radio"
                value={value}
                onChange={handleChange}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* Side */}
      <div className={styles.Settings__Control}>
        <div className={styles.Settings__ControlTitle}>Side:</div>
        <div className={styles.Settings__ControlInput}>
          {Object.values(SIDE).map((value) => (
            <label key={value}>
              <input
                checked={value === side}
                name="side"
                type="radio"
                value={value}
                onChange={handleChange}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* Quality */}
      <div className={styles.Settings__Control}>
        <div className={styles.Settings__ControlTitle}>Quality:</div>
        <div className={styles.Settings__ControlInput}>
          <input
            max="1"
            min="0"
            name="quality"
            step="0.01"
            type="number"
            value={quality === null ? '' : String(quality)}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

Settings.propTypes = {
  device: PropTypes.oneOf(Object.values(DEVICE)),
  placement: PropTypes.oneOf(Object.values(PLACEMENT)),
  quality: PropTypes.number,
  side: PropTypes.oneOf(Object.values(SIDE)),
  onChange: PropTypes.func,
};
Settings.defaultProps = {
  device: DEVICE.MOBILE,
  placement: PLACEMENT.COVER,
  quality: DEFAULT_QUALITY,
  side: SIDE.BACK,
  onChange: (_) => _,
};

export default Settings;
