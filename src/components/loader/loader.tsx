import React from 'react';
import styles from './loader.module.scss';
import classNames, { Argument } from 'classnames';

interface Props {
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    className?: Argument
}

const Loader: React.FC<Props> = (props) => {
    const { small, medium, large, className } = props;
    return <div className={classNames(styles.container, className)}>
        <div
            className={classNames(styles["lds-ring"],
                { [styles.smallLoader]: small },
                { [styles.mediumLoader]: medium },
                { [styles.largeLoader]: large }
            )}>
            <div></div><div></div><div></div><div></div>
        </div>
    </div>
}

export default Loader;