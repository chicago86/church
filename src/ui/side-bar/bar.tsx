import React from 'react';
import styles from './bar.module.scss';
import twitter from './images/icon/twitter.png'
import facebook from './images/icon/facebook.png'
import youtube from './images/icon/youtube.png'
import instagram from './images/icon/instagram.png'
import telegram from './images/icon/telegram.png'
import linkedin from './images/icon/linkedin.png'
import YouTubePlayer from '../youtube/youtube';
import qrCode from './images/qr/qr-code.png'




const Bar: React.FC = () => {
    const videoId = "https://youtu.be/dBWeR9Xyigo?si=9C6OyFOTGnISK7k6"

    const socialLinks = [
        { "id": 1, "qrLink": "", "img": require('./images/flag/usa.jpg'), "link": "https://example.com/link1" },
        { "id": 2, "qrLink": "", "img": require('./images/flag/french.jpg'), "link": "https://example.com/link2" },
        { "id": 3, "qrLink": "", "img": require('./images/flag/germany.jpg'), "link": "https://example.com/link3" },
        { "id": 4, "qrLink": "", "img": require('./images/flag/romania.jpg'), "link": "https://example.com/link4" },
        { "id": 5, "qrLink": "", "img": require('./images/flag/russia.jpg'), "link": "https://example.com/link5" },
        { "id": 6, "qrLink": "", "img": require('./images/flag/spain.jpg'), "link": "https://example.com/link6" }
    ];
    

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.left}>
                    <YouTubePlayer videoId={videoId} />
                </div>
                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        {socialLinks.map((link) => (
                            <div key={link.id} className={styles.socialBoxTop}>
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    <img className={styles.flagImg} src={link.img} alt={`Social Media ${link.id}`} />
                                    <img className={styles.qrCode} src={qrCode} alt="qr" />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className={styles.rightBottom}>
                        <div className={styles.iconRow}>
                            <div className={styles.socialBox}>
                                <a href="https://twitter.com" target='blank'><img className={styles.socialImg} src={twitter} alt="twitter" /></a>
                            </div>
                            <div className={styles.socialBox}>
                                <a href="https://youtube.com" target='blank'><img className={styles.socialImg} src={youtube} alt="youtube" /></a>
                            </div>
                            <div className={styles.socialBox}>
                                <a href="https://facebook.com" target='blank'><img className={styles.socialImg} src={facebook} alt="facebook" /></a>
                            </div>
                        </div>
                        <div className={styles.iconRow}>
                            <div className={styles.socialBox}>
                                <a href="https://instagram.com" target='blank'><img className={styles.socialImg} src={instagram} alt="instagram" /></a>
                            </div>
                            <div className={styles.socialBox}>
                                <a href="https://telegram.com" target='blank'><img className={styles.socialImg} src={telegram} alt="telegram" /></a>
                            </div>
                            <div className={styles.socialBox}>
                                <a href="https://linkedin.com" target='blank'><img className={styles.socialImg} src={linkedin} alt="linkedin" /></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bar;