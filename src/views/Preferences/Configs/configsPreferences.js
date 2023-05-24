import React, { useState, useEffect } from "react";
import $ from "jquery";
import { get_data, put_data } from "../../../actions/index";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Header from "../../../components/generals/header";
import Loading from "../../../components/generals/loading";
import styles from "../../../css/generals/Checkbox.module.css";
import stylesPreferences from "../../../css/preferences/Preferences.module.css";
import "../../../css/styles.css";
import { compareObj } from "../../../components/generals/toolsFunctions";

export default function Configs() {
    //const data = useSelector((state) => state.preferences.configs);
    const [settingsToCompare, setsettingsToCompare] = useState({});
    const [configs, setConfigs] = useState({});

    const getPreferences = async () => {
        let { data } = await get_data("preferences", 1);
        if(data){
            setConfigs(data);
            setsettingsToCompare(data);
            viewCheckbox(data.use_other, data.use_google);
        }
    };
    
    useEffect(() => {
        getPreferences();
    }, []);

    function viewCheckbox(others, google) {
    
        if (others === true) {
            $("#others_use").prop("checked", true);
        } else {
            $("#others_use").prop("checked", false);
        }

        if (google === true) {
            $("#google_use").prop("checked", true);
        } else {
            $("#google_use").prop("checked", false);
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name === "use_other") {
            $("#google_use").prop("checked", false);
            setConfigs({
                ...configs,
                [e.target.name]: $("#others_use").is(":checked"),
            });
        } else if (e.target.name === "use_google") {
            setConfigs({
                ...configs,
                [e.target.name]: $("#google_use").is(":checked"),
            });
        } else {
            setConfigs({
                ...configs,
                [e.target.name]: e.target.type === "number"? parseInt(e.target.value): e.target.value === ""? null: e.target.value,
            });
        }
    };
    
    
    const sendConfigs = async () => {
        let date = new Date().toISOString();
        let comparation = compareObj(configs, settingsToCompare);
        
        if(comparation){
            Swal.fire({
                position: "center",
                icon: "info",
                title: "¡No hay cambios para guardar!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            setConfigs({
                ...configs,
                date: date,
            });

            let { data } = await put_data("preferences", configs);
            if (data.result === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cambios guardados con exito!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al guardar los cambios!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        };
        setsettingsToCompare(configs);
        
    };

    if (Object.keys(configs).length === 0) {
        return (
            <div className="content-wrapper containerHeight">
                <Loading color="primary" />
            </div>
        );
    } else {
        return (
            <div className="content-wrapper containerHeight">
                <Header title="Configuración General" margin="0"/>
                <div className={styles.componentBox}>
                    <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                            Tiempo de conexion
                        </label>
                        <small className={`"text-muted" ${stylesPreferences.minutesPref}`}>(en minutos)</small>
                        <input
                            value={configs.time_connection}
                            name="time_connection"
                            onChange={handleInputChange}
                            type="number"
                            min={15}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div className={styles.componentBox}>
                    <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                            Tiempo de persistencia
                        </label>
                        <small className={`"text-muted" ${stylesPreferences.minutesPref}`} >(en minutos)</small>
                        <input
                            value={configs.time_persistence}
                            name="time_persistence"
                            type="number"
                            onChange={handleInputChange}
                            min={15}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div className={styles.componentBox}>
                    <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                            Otros tipos de ubicaciones
                        </label>
                        <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                            <input
                                value={configs.use_other}
                                checked={configs.use_other}
                                id="others_use"
                                name="use_other"
                                type="checkbox"
                                onChange={handleInputChange}
                                className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                            />
                            <span
                                className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                            />
                        </label>
                    </div>
                </div>
                <div
                    id="div_google"
                    className={styles.componentBox}
                    style={{
                        display: configs.use_other === true ? "block" : "none",
                    }}
                >
                    <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                            Ubicacion de Google
                        </label>
                        <label className={`${styles.switch} ${stylesPreferences.switchPref}`}>
                            <input
                                value={configs.use_google}
                                checked={configs.use_google}
                                id="google_use"
                                name="use_google"
                                type="checkbox"
                                onChange={handleInputChange}
                                className="focus"
                            />
                            <span
                                className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                            />
                        </label>
                    </div>
                </div>
                <div
                    id="div_url"
                    className={`${styles.componentBox} ${stylesPreferences.boxInputLargePref}`}
                    style={{
                        display:
                            configs.use_other === false
                                ? "none"
                                : configs.use_other === true &&
                                  configs.use_google === true
                                ? "block"
                                : "none",
                    }}
                >
                    <div className={`${styles.containerDiv} ${stylesPreferences.alignInputLarge}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>Url</label>
                        <input
                            value={configs.url_google}
                            name="url_google"
                            onChange={handleInputChange}
                            type="text"
                            className={`${styles.focus} ${stylesPreferences.inputLarge}`}
                        />
                    </div>
                </div>
                <div
                    id="div_key"
                    className={`${styles.componentBox} ${stylesPreferences.boxInputLargePref}`}
                    style={{
                        display:
                            configs.use_other === false
                                ? "none"
                                : configs.use_other === true &&
                                  configs.use_google === true
                                ? "block"
                                : "none",
                    }}
                >
                    <div className={`${styles.containerDiv} ${stylesPreferences.alignInputLarge}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>Clave</label>
                        <input
                            value={configs.key_google}
                            name="key_google"
                            onChange={handleInputChange}
                            type="text"
                            className={`${styles.focus} ${stylesPreferences.inputLarge}`}
                        />
                    </div>
                </div>
                <div className={styles.componentBox}>
                    <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>
                            Tiempos de ubicaciones
                        </label>
                        <small className={`"text-muted" ${stylesPreferences.minutesPref}`}>(en minutos)</small>
                        <input
                            value={configs.time_location}
                            onChange={handleInputChange}
                            name="time_location"
                            type="number"
                            min={2}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div className={`end-footer-body ${stylesPreferences.btnEnd}`}>
                    <Button onClick={sendConfigs} variant="dark">
                        <i className="fas fa-save" style={{marginRight: "0.5rem" }}></i>
                        Guardar
                    </Button>
                </div>
            </div>
        );
    }
}
