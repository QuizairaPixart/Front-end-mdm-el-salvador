import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import styles from "../../../css/reports/Menu.module.css";

export default function GroupDemo() {

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                    }
                }
            ]
        },
        {
            label: 'Links',
            items: [
                {
                    label: 'React Website',
                    icon: 'pi pi-external-link',
                    url: ''
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                    command: () => {
                    }
                }
            ]
        },
        {
            label: 'Settings',
            items: []
        }
    ];

    return (
        <>
            <div className={styles.menuContainer}>
                <Menu model={items} className={styles.menu}/>
                <div className={styles.selectButton} >
                    <button className={styles.switch} id="switch">
                        <span className={styles.switch_span}><i className="pi pi-sun"></i></span>
                        <span><i className="pi pi-moon"></i></span>
                    </button>
                </div>
            </div>
        </>
    )
}