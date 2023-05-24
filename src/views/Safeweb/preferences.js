import React, { useState, useEffect } from "react";
import { get_data, put_data } from "../../actions/index";
import $ from "jquery";
import Header from "../../components/generals/header";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import styles from "../../css/generals/Checkbox.module.css";
import stylesPreferences from "../../css/preferences/Preferences.module.css";
import "../../css/preferences/reports.css";
import "../../css/styles.css";
import { compareObj } from "../../components/generals/toolsFunctions";

export default function PreferencesSafeweb() {
    const [check, setCheck] = useState({});
    const [safeWeb, setSafeWeb] = useState(true);
    const [settingsToCompare, setsettingsToCompare] = useState({});

    const getData = async () => {
        let { data } = await get_data("safeweb/preferences", 1);

        if (data) {
            setCheck(data);
            setsettingsToCompare(data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOnChange = (e) => {
        if(e.target.id === "safeWeb"){
            let value = $(`#${e.target.id}`).is(":checked");
            if(!value){
                setSafeWeb(value);
                setCheck({
                    ...check,
                    blackList: value,
                    whiteList: value,
                    keyWords: value,
                });
            } else {
                setSafeWeb(value);
            }
        } else if(e.target.id === "daysSafeWeb"){
            setCheck({
                    ...check,
                    historyDays: parseInt(e.target.value),
                });
        } else {
            setCheck({
                ...check,
                [e.target.id]: $(`#${e.target.id}`).is(":checked"),
            });
        }
    };

    async function savePreferences() {
        let date = new Date().toISOString();
        let comparation = compareObj(check, settingsToCompare);

        if(comparation){
            Swal.fire({
                position: "center",
                icon: "info",
                title: "¡No hay cambios para guardar!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            setCheck({
                ...check,
                date: date,
            });

            let  { data } = await put_data("safeweb/preferences", check);

            if (data.result) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Actualizacion exitosa!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Actualizacion fallida!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
        setsettingsToCompare(check);
    }

    return (
        <div className="containerHeight content-wrapper">
            <Header title="Configuracion General" margin="0"/>
            <div className={styles.componentBox}>
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                        Activar SafeWeb
                    </label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={safeWeb}
                            checked={safeWeb}
                            id="safeWeb"
                            type="checkbox"
                            onChange={handleOnChange}
                            className="focus"
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div
                className={styles.componentBox}
                style={{
                    display: safeWeb ? "block" : "none",
                }}
            >
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>Lista Negra</label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={check.blackList}
                            checked={check.blackList}
                            id="blackList"
                            type="checkbox"
                            onChange={handleOnChange}
                            className="focus"
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div
                className={styles.componentBox}
                style={{
                    display: safeWeb ? "block" : "none",
                }}
            >
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>Lista Blanca</label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={check.whiteList}
                            checked={check.whiteList}
                            id="whiteList"
                            type="checkbox"
                            onChange={handleOnChange}
                            className="focus"
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div
                className={styles.componentBox}
                style={{
                    display: safeWeb? "block" : "none",
                }}
            >
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                        Palabras Claves
                    </label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={check.keyWords}
                            checked={check.keyWords}
                            id="keyWords"
                            type="checkbox"
                            onChange={handleOnChange}
                            className="focus"
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div
                className={styles.componentBox}
                style={{
                    display: safeWeb? "block" : "none",
                }}
            >
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                        Guardado del Historial:
                    </label>
                    <input
                        style={{ width: "4rem" }}
                        value={check.historyDays}
                        id="daysSafeWeb"
                        onChange={handleOnChange}
                        type="number"
                        className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        min={1}
                    />
                </div>
            </div>
            <div className={styles.componentBox}>
                <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                    <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                        Activar Respuesta por Defecto
                    </label>
                    <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                        <input
                            value={check.responseDefault}
                            checked={check.responseDefault}
                            id="responseDefault"
                            type="checkbox"
                            onChange={handleOnChange}
                            className="focus"
                        />
                        <span
                            className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                        />
                    </label>
                </div>
            </div>
            <div className={`end-footer-body ${stylesPreferences.btnEnd}`}>
                <Button onClick={() => savePreferences()} variant="dark">
                    <i className="fas fa-save" style={{marginRight: "0.5rem" }}></i>
                    Guardar
                </Button>
            </div>
        </div>
    );
}
