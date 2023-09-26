import styles from './socials.module.scss';
import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import linkedin from './images/linkedin.png';
import telegram from './images/telegram.png';
import twitter from './images/twitter.png';
import youtube from './images/youtube.png';

interface Props {
}

const socialIcons = [
    {id: 1, icon: facebook, link: 'https://www.facebook.com', name: 'facebook'},
    {id: 2, icon: instagram, link: 'https://www.instagram.com', name: 'instagram'},
    {id: 3, icon: linkedin, link: 'https://www.linkedin.com', name: 'linedin'},
    {id: 4, icon: telegram, link: 'https://www.telegram.com', name: 'telegram'},
    {id: 5, icon: twitter, link: 'https://www.twitter.com', name: 'twitter'},
    {id: 6, icon: youtube, link: 'https://www.youtube.com', name: 'youtube'}
]

const Socials: React.FC<Props> = (props) => {
    return <div className={styles.socials}>
        {
            socialIcons.map(elem => (
                <div key={elem.id} className={styles.social}><img src={elem.icon} alt={elem.name} /></div>
            ))
        }
    </div>
}

export default Socials;