import React, { useState } from "react";
import store from "../reducer/store";
import { NavLink } from "react-router-dom";
import "../css/menu.css";

export default function Menu() {
    let { user } = store.getState();
    const [views, setViews] = useState({
        preferences: false,
        safeweb: false,
    });

    let range = user.range;
    let id = user.userId;

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <NavLink to="/mdm/home" className="brand-link ">
                <div className="mdm-logo"></div>
            </NavLink>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink
                                to="/mdm/home"
                                className="nav-link hoverly"
                            >
                                <i className="fa-solid fa-house nav-icon"></i>
                                <p className="colorLeters">Inicio</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/mdm/devices"
                                className="nav-link hoverly"
                            >
                                <i className="fa-solid fa-tablet-screen-button nav-icon"></i>
                                <p className="colorLeters">Equipos</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/mdm/groups"
                                className="nav-link hoverly"
                            >
                                <i className="fas fa-users nav-icon"></i>
                                <p className="colorLeters">Grupos</p>
                            </NavLink>
                        </li>
                        {range === 1 ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/mdm/users"
                                    className="nav-link hoverly"
                                >
                                    <i
                                        className="fas fa-user-friends nav-icon"
                                        aria-hidden="true"
                                    ></i>
                                    <p className="colorLeters">Usuarios</p>
                                </NavLink>
                            </li>
                        ) : null}
                        {range === 1 ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/mdm/applications"
                                    className="nav-link hoverly"
                                >
                                    <i
                                        className="fa fa-solid fa-shapes nav-icon"
                                        aria-hidden="true"
                                    ></i>
                                    <p className="colorLeters">Aplicaciones</p>
                                </NavLink>
                            </li>
                        ) : null}
                        {range === 1 ? (
                            <li className="nav-item dropdown">
                                <div
                                    className="nav-link"
                                    onClick={() =>
                                        setViews({
                                            ...views,
                                            preferences: !views.preferences,
                                        })
                                    }
                                >
                                    <i className="fas fa-cogs nav-icon "></i>
                                    <p className="colorLeters">
                                        Preferencias
                                        <i className="fas fa-angle-left float-right right" />
                                    </p>
                                </div>
                                <ul
                                    className="nav nav-treeview"
                                    style={{
                                        display: views.preferences
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li className="nav-item">
                                        <NavLink
                                            to="/mdm/preferences/configs"
                                            className="nav-link hoverly"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p className="colorLeters">
                                                Configuraciones
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/mdm/preferences/reports"
                                            className="nav-link hoverly"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p className="colorLeters">
                                                Reportes
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/mdm/preferences/lost"
                                            className="nav-link hoverly"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p className="colorLeters">
                                                Extravios
                                            </p>
                                        </NavLink>
                                    </li>
                                    {id === 1 ? (
                                        <li className="nav-item">
                                            <NavLink
                                                to="/mdm/preferences/server"
                                                className="nav-link hoverly"
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p className="colorLeters">
                                                    Servidor
                                                </p>
                                            </NavLink>
                                        </li>
                                    ) : null}

                                </ul>
                            </li>
                        ) : null}

                        <li className="nav-item dropdown">
                            <div
                                className="nav-link"
                                onClick={() =>
                                    setViews({
                                        ...views,
                                        safeweb: !views.safeweb,
                                    })
                                }
                            >
                                <i className="fa-solid fa-shield-halved nav-icon"></i>
                                <p className="colorLeters">
                                    Safeweb
                                    <i className="fas fa-angle-left right float-right" />
                                </p>
                            </div>
                            <ul
                                className="nav nav-treeview"
                                style={{
                                    display: views.safeweb ? "block" : "none",
                                }}
                            >
                                <li className="nav-item">
                                    <NavLink
                                        to="/mdm/safeweb"
                                        className="nav-link hoverly"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p className="colorLeters">Inicio</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/mdm/lists"
                                        className="nav-link hoverly"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p className="colorLeters">Listas</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/mdm/words"
                                        className="nav-link hoverly"
                                    >
                                        <i className="far fa-circle nav-icon" />
                                        <p className="colorLeters">
                                            Palabras claves
                                        </p>
                                    </NavLink>
                                </li>
                                {range === 1 ? (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/mdm/safeweb/preferences"
                                            className="nav-link hoverly"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p className="colorLeters">
                                                Preferencias
                                            </p>
                                        </NavLink>
                                    </li>
                                ) : null}
                            </ul>
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link hoverly"
                                    onClick={() => sessionStorage.clear()}
                                >
                                    <i
                                        className="fa fa-arrow-left nav-icon"
                                        aria-hidden="true"
                                    ></i>
                                    <p className="colorLeters">Salida</p>
                                </NavLink>
                            </li>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="footer-version">
                <b>Versión 4.0.0</b>
            </div>
        </aside>
    );
}
