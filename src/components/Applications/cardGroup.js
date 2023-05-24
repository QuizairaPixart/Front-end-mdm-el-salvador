import React from "react";
import { ListBox } from "primereact/listbox";
import styles from "../../css/applications/Card.module.css";

export default function CardGroup(props) {
    const countryTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.app}</div>
            </div>
        );
    };

    return (
        <div className={styles.cardGroup}>
            <h3>{props.category.name}</h3>
            <ListBox
                options={
                    props.apps &&
                    props.apps.filter(
                        (app) => app.groupApp === props.category.id
                    )
                }
                filter
                optionLabel="app"
                itemTemplate={countryTemplate}
                style={{
                    width: "20rem",
                }}
                listStyle={{ maxHeight: "250px" }}
            />
        </div>
    );
}
