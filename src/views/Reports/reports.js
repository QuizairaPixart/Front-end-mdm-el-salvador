import React from "react";
import Footer from "./footer-reports";
import Header from "./header-reports";
import styles from "../../css/reports/Reports.module.css";
import Menu from "./menu";

export default function Reports() {
    return (
        <>  
            <Header />
            <div className={styles.contentReports}>
                <Menu 
                    className={styles.menu}
                />
                <div className={styles.childContainer}>
                    <Footer /> 
                </div>
                
            </div>
        </>
    );
}