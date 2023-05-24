/* eslint-disable react/style-prop-object */
import React from "react";
import styles from "../../css/index/Footer.module.css";

export default function Footer() {
    return (
        <footer className="content">
            <div className={styles.bodyFooter}>
                <div className={styles.icons}>
                    <i class="fa-brands fa-php"></i>
                    <i class="fa-brands fa-react"></i>
                    <i class="fa-brands fa-js"></i>
                    <i class="fa-brands fa-angular"></i>
                    <i class="fa-brands fa-java"></i>
                    <i class="fa-brands fa-html5"></i>
                    <i class="fa-brands fa-css3-alt"></i>
                    <i class="fa-brands fa-android"></i>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>Powered by Pixart | © Copyright All Rights Reserved. </p>
            </div>
        </footer>
    );
}
