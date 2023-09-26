import classNames from 'classnames';
import styles from './side-bar.module.scss';
import { Socials } from './socials';
import { VideoLinks } from './video-links';
import { VideoLibrary } from '../../video-library';


interface Props {
    isMobile?: boolean
    isOpen?: boolean;
}

const SideBar: React.FC<Props> = ({ isMobile, isOpen }) => {
    return <div className={classNames(styles.sideBar,
        { [styles.mobile]: isMobile },
        { [styles.active]: isOpen }
    )}
        onClick={(e) => e.stopPropagation()}>
        <VideoLibrary/>
        <Socials />
    </div>
}

export default SideBar;
