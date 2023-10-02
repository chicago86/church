// SideBar.tsx

import classNames from 'classnames';
import styles from './side-bar.module.scss';
import { Socials } from './socials';
import { VideoLibrary } from '../../video-library';

interface Props {
    isMobile?: boolean
    isOpen?: boolean;
    closeMenu?: () => void; 
}

const SideBar: React.FC<Props> = ({ isMobile, isOpen, closeMenu }) => {
    const handleClick = () => {
        if (closeMenu) {
            closeMenu(); 
        }
    };

    return (
        <div className={classNames(styles.sideBar,
            { [styles.mobile]: isMobile },
            { [styles.active]: isOpen }
        )}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            <VideoLibrary />
            <Socials />
        </div>
    );
}

export default SideBar;
