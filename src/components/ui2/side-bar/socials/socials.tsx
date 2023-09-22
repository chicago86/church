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
    {id: 1, icon: facebook, link: 'insertLink', name: 'facebook'},
    {id: 2, icon: instagram, link: 'insertLink', name: 'instagram'},
    {id: 3, icon: linkedin, link: 'insertLink', name: 'linedin'},
    {id: 4, icon: telegram, link: 'insertLink', name: 'telegram'},
    {id: 5, icon: twitter, link: 'insertLink', name: 'twitter'},
    {id: 6, icon: youtube, link: 'insertLink', name: 'youtube'}
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