import React from 'react';
import { Menu } from 'primereact/menu';
import styles from "../../css/reports/Menu.module.css";

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
        }
    ];

    return (
        <Menu model={items} className={styles.menuContainer}/>
    )
}