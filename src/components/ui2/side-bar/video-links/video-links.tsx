import { QrCode } from '../qr-code';
import styles from './video-links.module.scss';

interface Props {
}

const videos = [
    { "id": 1, "qrLink": "", "img": require('./images/usa.jpg'), "link": "https://example.com/link1", language: 'english' },
    { "id": 2, "qrLink": "", "img": require('./images/french.jpg'), "link": "https://example.com/link2", language: 'french' },
    { "id": 3, "qrLink": "", "img": require('./images/germany.jpg'), "link": "https://example.com/link3", language: 'german' },
    { "id": 4, "qrLink": "", "img": require('./images/romania.jpg'), "link": "https://example.com/link4", language: 'romanian' },
    { "id": 5, "qrLink": "", "img": require('./images/russia.jpg'), "link": "https://example.com/link5", language: 'russian' },
    { "id": 6, "qrLink": "", "img": require('./images/spain.jpg'), "link": "https://example.com/link6", language: 'spanish' }
];

const VideoLinks: React.FC<Props> = (props) => {
    return <div className={styles.videoLinks}>
       {
        videos.map(link => (
            <div key={link.id} className={styles.linkItem}>
                <a className={styles.flag}><img src={link.img} alt={link.language} /></a>
                <QrCode/>
            </div>
        ))
       }
    </div>
}

export default VideoLinks;