import React, { useState, useEffect } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import Loading from "../../../components/generals/loading";
import Button from "react-bootstrap/Button";
import Header from "../../../components/generals/header";
import { put_data, get_data } from "../../../actions/index";
import styles from "../../../css/generals/Checkbox.module.css";
import stylesPreferences from "../../../css/preferences/Preferences.module.css";
import "../../../css/styles.css";

export default function Mailing() {
    //const data = useSelector((state) => state.preferences.configs);
    const [locked, setLocked] = useState({});

    const getPreferencesLocked = async () => {
        let { data } = await get_data("preferences/thief", 1);
        
        if (data) {
            setLocked(data); 
        }
    };

    useEffect(() => {
        getPreferencesLocked();
    }, []);

    const handleInputChange = (e) => {
        let value = $(`#${e.target.id}`).is(":checked");
        if (e.target.type === "checkbox" && e.target.id === "statusTracking" && !value) {
            setLocked({
                ...locked,
                photo: value,
                recursive: value,
                [e.target.id]: value
            });
        } else if (e.target.type === "checkbox" && e.target.id === "photo" && !value) {
            setLocked({
                ...locked,
                recursive: value,
                [e.target.id]: value
            });
        } else if(e.target.type === "checkbox"){
            setLocked({
                ...locked,
                [e.target.id]: value
            });
        } else {
            setLocked({
                ...locked,
                [e.target.id]: e.target.value,
            });
        }
    };

    const sendConfigsLocked = async () => {
        setLocked({
            ...locked,
            date: new Date(Date.now()),
        });

        let response = await put_data("preferences/thief", locked);
        if (response.data.result === true) {
            Swal.fire({
                title: "Cambios guardados con exito!",
                icon: "success",
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

    if (Object.keys(locked).length === 0) {
        return (
            <div className="content-wrapper containerHeight">
                <Loading color="primary" />
            </div>
        );
    } else {
        return (
            <div className="content-wrapper containerHeight">
                <Header title="Configuración de Extravios" margin="0" />
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Usar configuración por defecto
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.default}
                                checked={locked.default}
                                id="default"
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
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Bloqueo de tactil
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.touch}
                                checked={locked.touch}
                                id="touch"
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
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Bloqueo de pantalla
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.screen}
                                checked={locked.screen}
                                id="screen"
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
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Cambiar fondo de pantalla
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.background}
                                checked={locked.background}
                                id="background"
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
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Activar alerta
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.alarm}
                                checked={locked.alarm}
                                id="alarm"
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
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Mensaje de notificación
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                checked={locked.statusMessage}
                                value={locked.statusMessage}
                                id="statusMessage"
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
                    className={`${styles.componentBox} ${stylesPreferences.boxInputLargePref}`}
                    style={{
                        display:
                            locked.statusMessage === true ? "block" : "none",
                    }}
                >

                    <div className={`${styles.containerDiv} ${stylesPreferences.alignInputLarge}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>

                            Titulo:
                        </label>
                        <input
                            value={locked.messageTitle}
                            id="messageTitle"
                            onChange={handleInputChange}
                            type="text"
                            className={`${styles.focus} ${stylesPreferences.inputTitleMessage}`}
                        />
                    </div>
                </div>
                <div
                    id="body-message"
                    className={`${styles.componentBox} ${stylesPreferences.boxMessage}`}
                    style={{ display: locked.statusMessage ? "block" : "none" }}
                >

                    <div className={`${styles.containerDiv} ${stylesPreferences.alignMessage}`}>
                        <label className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}>

                            Mensaje:
                        </label>
                        <textarea
                            value={locked.messageBody}
                            id="messageBody"
                            onChange={handleInputChange}
                            type="text"
                            className={`${styles.focus} ${stylesPreferences.message}`}
                        />
                    </div>
                </div>
                <div className={styles.componentBox}>
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Activar tracking
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.statusTracking}
                                checked={locked.statusTracking}
                                id="statusTracking"
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
                    className={styles.componentBox}
                    style={{
                        display:
                            locked.statusTracking === true ? "block" : "none",
                    }}
                >
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Toma de datos:
                        </label>
                        <small className="text-muted">(en minutos)</small>
                        <input
                            value={locked.timeTracking}
                            id="timeTracking"
                            onChange={handleInputChange}
                            type="number"
                            min={1}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div
                    className={styles.componentBox}
                    style={{
                        display:
                            locked.statusTracking === true ? "block" : "none",
                    }}
                >
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Envio de datos:
                        </label>
                        <small className="text-muted">(en minutos)</small>
                        <input
                            value={locked.timeRequest}
                            id="timeRequest"
                            onChange={handleInputChange}
                            type="number"
                            min={1}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div className={styles.componentBox}
                    style={{
                        display:
                            locked.statusTracking === true ? "block" : "none",
                    }}
                >
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Generar imagenes
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.photo}
                                checked={locked.photo}
                                id="photo"
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
                    id="divInterval"
                    className={styles.componentBox}
                    style={{
                        display: locked.statusTracking === true ? 
                        (locked.photo === true ?
                        "block" : "none") 
                        :"none"
                    }}
                >
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Intervalo de imagenes
                        </label>
                        <small className="text-muted">(en minutos)</small>
                        <input
                            value={locked.timeImage}
                            id="timeImage"
                            onChange={handleInputChange}
                            type="number"
                            min={1}
                            max={525600}
                            className={`${styles.focus} ${stylesPreferences.inputsPref}`}
                        />
                    </div>
                </div>
                <div
                    className={styles.componentBox}
                    style={{
                        display: locked.statusTracking === true ? 
                        (locked.photo === true ?
                        "block" : "none") 
                        :"none"
                    }}
                >
                    <div
                        className={`${styles.containerDiv} ${stylesPreferences.align}`}
                    >
                        <label
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Recursivo
                        </label>
                        <label
                            className={`${styles.switch} ${stylesPreferences.switchPref}`}
                        >
                            <input
                                value={locked.recursive}
                                checked={locked.recursive}
                                id="recursive"
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
                    className={`${styles.componentBox} ${stylesPreferences.boxSliderPref}`}
                    style={{
                        display: locked.statusTracking === true ? 
                        (locked.photo === true ?
                        "block" : "none") 
                        :"none"
                    }}
                >

                    <div className={stylesPreferences.alignSlider}>

                        <label
                            for="resolution_images"
                            className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
                        >
                            Resolucion de imagenes:
                        </label>
                        <select
                            id="quality"
                            value={locked.quality}
                            onChange={handleInputChange}
                            class="form-control"

                            className={`${styles.focus} ${stylesPreferences.selectLocked}`}

                            name="resolution_images"
                            defaultValue={"default"}
                        >
                            <option value="default" disabled>
                                Seleccione el tipo de resolucion
                            </option>
                            <option value="high">Alto</option>
                            <option value="mid">Medio</option>
                            <option value="low">Bajo</option>
                        </select>
                    </div>
                </div>
                <div className={`end-footer-body ${stylesPreferences.btnEnd}`}>
                    <Button onClick={sendConfigsLocked} variant="dark">
                        <i className="fas fa-save" style={{marginRight: "0.5rem" }}></i>
                        Guardar
                    </Button>
                </div>
            </div>
        );
    }
}
