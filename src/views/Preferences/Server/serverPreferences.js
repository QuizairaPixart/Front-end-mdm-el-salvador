import React, { useState } from "react";
import Swal from "sweetalert2";
import $ from "jquery";
import { redirectIndex } from "../../../components/generals/redirect";
import { post_data } from "../../../actions/index";
import { SignJWT } from "jose";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";
import ModalGeneric from "../../../components/modals/modal";
import Header from "../../../components/generals/header";
import styles from "../../../css/generals/Checkbox.module.css";
import stylesPreferences from "../../../css/preferences/Preferences.module.css";

export default function Server() {
    let navigate = useNavigate();
    let user = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);
    const [passwords, setPasswords] = useState({
        pass1: '',
        pass2: ''
    });

    const [viewPasswords, setViewPasswords] = useState({
        pass1: false,
        pass2: false
    });

    const [checks, setChecks] = useState({
        mdm: false,
        safeweb: false,
    });

   
    const handleOnChange = (e) => {
        setChecks({
            ...checks,
            [e.target.id]: $(`#${e.target.id}`).is(":checked"),
        });
    };
    
    function handleOnChangePasswords(e) {
        setPasswords({
            ...passwords,
            [e.target.id]: e.target.value,
        });
    }

    const restoreDB = async () => {
        $('#btnModalSucess').prop('disabled', true);
        if (
            passwords.pass1 ===
            passwords.pass2
        ) {
            if (
                passwords.pass1 ===
                "ESTASPORBORRARTODO"
            ) {
                const hash = new TextEncoder().encode(
                    config.restore.hash
                );

                const jwt = await new SignJWT({
                    password: "ESTASPORBORRARTODO",
                })
                    .setProtectedHeader({ alg: "HS256" })
                    .sign(hash);

                let json = {
                    user: parseInt(user.userId),
                    token: jwt,
                    mdm: checks.mdm,
                    safeweb: checks.safeweb,
                };

                //mandar al backend para verificar si esta bien la contraseña
                //esperar response, si esta bien devolver ok sino error

                let { data } = await post_data("resetFactory", json);
                if (data.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Base de datos restaurada correctamente!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    redirectIndex();
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 5000);
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error, contraseña incorrecta!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error, contraseña incorrecta!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            }
            //sino mostrar alerta de error
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Las contraseñas deben coincidir!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    };

    function showPasswords() {
        setShowModal(false)
        setPasswords({
            pass1: "",
            pass2: "",
        });
    }

    function closeModal() {
        setShowModal(false)
        setPasswords({
            pass1: "",
            pass2: "",
        });
    }

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Restauracion de base de datos" margin="0"/>
            <div className={styles.componentBox}>
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>MDM</label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={checks.mdm}
                            checked={checks.mdm}
                            id="mdm"
                            type="checkbox"
                            onChange={handleOnChange}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div className={styles.componentBox}>
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>Safeweb</label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={checks.safeweb}
                            checked={checks.safeweb}
                            id="safeweb"
                            type="checkbox"
                            onChange={handleOnChange}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div className={`end-footer-body ${stylesPreferences.btnEnd}`}>
                <Button onClick={() => setShowModal(true)} variant="dark">
                <i className="fas fa-undo" style={{marginRight: "0.5rem" }}></i>
                    Restaurar
                </Button>
            </div>
            <ModalGeneric 
            show={showModal}
            onHide={() => setShowModal(false)}
            id="restoreDB"
            size="md"
            onClose={closeModal}
            title="Restauracion de base de datos"
            btnError="Cerrar"
            actionError={closeModal}
            btnSuccess="Restaurar"
            actionSuccess={restoreDB}
            > 
                <div>
                    <div>
                        <div>
                            <label className={styles.sliderLabel}>                   
                                Escriba la contraseña
                            </label>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                justifyContent: "flex-end",
                                display: "flex",
                            }}
                        >
                            <input
                                placeholder="Escriba la contraseña"
                                id="pass1"
                                value={passwords.pass1}
                                onChange={handleOnChangePasswords}
                                type={viewPasswords.pass1 && viewPasswords.pass1 === true ? "text" : "password"}
                                style={{width: "100%"}}
                                className={styles.focus}
                            />
                            <button 
                                onClick={() => setViewPasswords({...viewPasswords, pass1: !viewPasswords.pass1})} 
                                className={stylesPreferences.buttonShow}
                            >
                                {viewPasswords.pass1 ? (<i className="fas fa-eye"></i>) : (<i className="fas fa-eye-slash"></i>)}
                            </button>
                        </div>
                    </div>
                    <div
                        style={{marginTop: "1rem"}}>
                        <div>
                            <label className={styles.sliderLabel}>                   
                                Repetir la contraseña
                            </label>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                justifyContent: "flex-end",
                                display: "flex",
                            }}
                        >
                            <input
                                placeholder="Escriba la contraseña"
                                id="pass2"
                                value={passwords.pass2}
                                onChange={handleOnChangePasswords}
                                type={viewPasswords.pass2 && viewPasswords.pass2 === true ? "text" : "password"}
                                style={{width: "100%"}}
                                className={styles.focus}
                            />
                            <button 
                                onClick={() => setViewPasswords({...viewPasswords, pass2: !viewPasswords.pass2})} 
                                className={stylesPreferences.buttonShow}
                            >
                                {viewPasswords.pass2 ? (<i className="fas fa-eye"></i>) : (<i className="fas fa-eye-slash"></i>)}
                            </button>
                        </div>
                    </div>
                </div>
            </ModalGeneric>
        </div>
    );
}
