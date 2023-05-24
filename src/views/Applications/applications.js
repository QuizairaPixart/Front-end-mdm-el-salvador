import React, { useState, useEffect } from "react";
import { get_data } from "../../actions/index";
import Button from "react-bootstrap/Button";
import Header from "../../components/generals/header";
import CardGroup from "../../components/Applications/cardGroup";
import { NavLink } from "react-router-dom";
import styles from "../../css/applications/Apps.module.css";

const categorys = [
    { name: "Sistema", id: 1 },
    { name: "Educativas", id: 2 },
    { name: "No Educativas", id: 3 },
    { name: "Productividad", id: 4 },
    { name: "Internet", id: 5 },
    { name: "Ocio", id: 6 },
    { name: "Otras", id: 7 },
    { name: "No Permitidas", id: 0 },
];

export default function Applications() {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        getApps();
    }, []);

    const getApps = async () => {
        let { data } = await get_data("applications");
        setApps(data);
    };

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Aplicaciones" />
            <div className="container-toggle">
                <NavLink
                    to="/mdm/applications/manage"
                    className={`nav-link hoverly ${styles.linkButton}`}
                    state={apps}
                >
                    <Button variant="dark" className={`${styles.button}`}>
                        <i className="fas fa-cog" style={{marginRight: "0.5rem"}}></i>
                        Gestionar
                    </Button>
                </NavLink>
            </div>

            <div className={styles.spaceCardApps}>
                {categorys &&
                    categorys.map((category) => {
                        return (
                            <CardGroup
                                key={category.id}
                                apps={apps}
                                category={category}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
