import React from 'react';

// Icons
import LogoIcon from '../../icons/logo.svg';

import styles from './styles.sass';

function Header(props) {
    const {} = props;

    return (
        <div className={styles.Header}>
            <div className={styles.Header__Icon}>
                <img src={LogoIcon} alt="Logo" />
            </div>
            <h1 className={styles.Header__Title}>React Camera iOS</h1>
        </div>
    );
}

export default Header;
