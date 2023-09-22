import styles from './side-bar.module.scss';
import { Socials } from './socials';
import { VideoLinks } from './video-links';

interface Props {
}

const SideBar: React.FC<Props> = (props) => {
    return <div className={styles.sideBar}>
       <VideoLinks/>
       <Socials/>
    </div>
}

export default SideBar;