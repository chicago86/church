import styles from './qr-code.module.scss';
import qrIcon from './images/qr-code.png';

interface Props {
}

const QrCode: React.FC<Props> = (props) => {
    return <div className={styles.qrCode}>
        <img src={qrIcon} alt="qr" />
    </div>
}

export default QrCode;