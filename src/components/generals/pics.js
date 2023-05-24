import styles from "../../css/devices/Pics.module.css";

export default function Pics(props) {
    return (
        <div className={styles.pic}>
            <img src={props.img} alt="img" />
            <div className={styles.info}>
                <h6>{props.date}</h6>
                <i class="fa-sharp fa-solid fa-circle-down"></i>
            </div>
        </div>
    );
}
