import React from "react";
import styles from "../../css/reports/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.main_footer}>
            <strong className={styles.rights}>
                Copyright © 2014-2022{" "}
                <a href="https://pixartargentina.com.ar/">Pixart S.R.L.</a> Derechos reservados.
            </strong>
        </footer>
    );
}