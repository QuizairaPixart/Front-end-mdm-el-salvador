import { Avatar } from "primereact/avatar";
import styles from "../../css/Dashboards/Info.module.css";

export default function Info(props) {
    return (
        <div
            className={styles.containerInfo}
            style={{ width: props.width, height: props.height, marginBottom: props.marginBottom }}
        >
            <div className={styles.headerInfo}>
                <Avatar
                    icon={props.icon}
                    className="mr-2"
                    size="large"
                    style={{ backgroundColor: "#E4E4E4", color: "black" }}
                    shape="circle"
                />
            </div>
            <div className={styles.bodyInfo}>
                <h5>{props.title}</h5>
                <p>{props.value}</p>
            </div>
        </div>
    );
}
