import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/generals/ReturnButton.module.css";

export default function ReturnButton({ redirect }) {
    return (
        <NavLink to={`/mdm/${redirect}`} 
            className={`btn btn-dark ${styles.arrow}`}
            type="button"
        >
            <i
                className="pi pi-arrow-circle-left"
                style={{ marginRight: "0.5rem" }}
            ></i>
            Regresar
        </NavLink>
    );
}
