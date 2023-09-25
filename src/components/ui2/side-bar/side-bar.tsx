import classNames from 'classnames';
import styles from './side-bar.module.scss';
import { Socials } from './socials';
import { VideoLinks } from './video-links';

interface Props {

    isMobile?: boolean
}

const SideBar: React.FC<Props> = ({isMobile}) => {
    return <div className={classNames(styles.sideBar, {[styles.mobile]: isMobile})}>
       <VideoLinks/>
       <Socials/>
    </div>
}

export default SideBar;