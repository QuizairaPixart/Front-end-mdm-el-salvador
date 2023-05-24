/* eslint-disable react/style-prop-object */
import React from "react";
import styles from "../../css/index/CardFunction.module.css";

export default function CardFunction(props) {
    return (
        <div className={styles.contentCard}>
            <img src={props.icon} alt="logo" />
            <p>{props.text}</p>
        </div>
    );
}
