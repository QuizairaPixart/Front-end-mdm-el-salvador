/* eslint-disable react/style-prop-object */
import React from "react";
import styles from "../../css/index/Card.module.css";

export default function Card(props) {
    return (
        <div className={styles.bodyCard}>
            <img src={props.logo} alt="logo" />
            <h4>{props.title}</h4>
            <p>{props.text}</p>
        </div>
    );
}
