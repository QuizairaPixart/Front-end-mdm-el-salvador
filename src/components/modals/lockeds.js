import React, { useState, useEffect, useRef } from "react";
import { post_data, put_data } from "../../actions/index";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Loading from "../generals/loading";
import { elementsLocked } from "./Assets/jsons";
import { Accordion, AccordionTab } from 'primereact/accordion';
import styles from "../../css/modals/Modal.module.css";
import styleschecks from "../../css/generals/Checkbox.module.css";


export default function LockedDevices(props) {
    //console.log(props);
    const user = useRef();
    const userData = useSelector((state) => state.user);
    const [id, setId] = useState(Math.round(Math.random() * (1000000000000000 - 10 + 1) + 10)); 
    const [data, setData] = useState({
        alarm: props.preferences.alarm,
        touch: props.preferences.touch,
        screen: props.preferences.screen,
        background: props.preferences.background,
        usb: props.preferences.usb,
        statusMessage: props.preferences.statusMessage,
        messageTitle: props.preferences.messageTitle,
        messageBody: props.preferences.messageBody,
        photo: {
            status: props.preferences.photo,
            resolution: props.preferences.quality,
            recursive: props.preferences.recursive,
            time: props.preferences.timeImage,
        },
    });

    const [tracking, setTracking] = useState({
        statusTracking: props.preferences.statusTracking,
        tracking: props.preferences.timeTracking,
        report: props.preferences.timeRequest
    });

    useEffect(() => {
        user.current = userData.userId;
    }, []);

    function handleOnChange(e) {
        if (e.target.type === "checkbox") {
            var value = $(`#${e.target.id}`).is(":checked");
            if (e.target.id === "status" || e.target.id === "recursive") {
                setData({
                    ...data,
                    photo: {
                        ...data.photo,
                        [e.target.id]: value,
                    },
                });
            } else if (e.target.id === "statusTracking") {
                if(!value){
                    setData({
                        ...data,
                        photo: {
                            ...data.photo,
                            status: value,
                        },
                    });
                }
                setTracking({
                    ...tracking,
                    [e.target.id]: value,
                });
            } else {
                setData({
                    ...data,
                    [e.target.id]: value,
                });
            }
        } else {
            if (e.target.id === "resolution" || e.target.id === "time") {
                setData({
                    ...data,
                    photo: {
                        ...data.photo,
                        [e.target.id]: e.target.value,
                    },
                });
            } else if (e.target.id === "report" || e.target.id === "tracking") {
                setTracking({
                    ...tracking,
                    [e.target.id]: e.target.value,
                });
            } else {
                setData({
                    ...data,
                    [e.target.id]: e.target.value,
                });
            }
        }
    }

    function closeModal() {
        props.onHide();
        setData({
            alarm: props.preferences.alarm,
            touch: props.preferences.touch,
            screen: props.preferences.screen,
            background: props.preferences.background,
            usb: props.preferences.usb,
            statusMessage: props.preferences.statusMessage,
            messageTitle: props.preferences.messageTitle,
            messageBody: props.preferences.messageBody,
            photo: {
                status: props.preferences.photo,
                resolution: props.preferences.quality,
                recursive: props.preferences.recursive,
                time: props.preferences.timeImage,
            },
        });
        setTracking({
            statusTracking: props.preferences.statusTracking,
            tracking: props.preferences.timeTracking,
            report: props.preferences.timeRequest
        });
        setId(Math.round(Math.random() * (1000000000000000 - 10 + 1) + 10));
    }

    async function sendAction() {
        $('#btnModalSucess').prop('disabled', true);
        
        if(data.statusMessage === false){
            data.messageTitle = "";
            data.messageBody = "";
        };

        let json = {
            action: "lock",
            data: {
                statusLock: props.action === "bloquear" ? true : false,
                order_id: id,
                preferences: data,
            },
            devicesId: props.devices !== undefined ? props.devices : [],
            groupsId: props.group !== undefined ? props.group : [],
        };

        let jsonTracking = {
            action: "tracking",
            data: {
                statusTracking: tracking.statusTracking,
                report: tracking.report,
                tracking: tracking.tracking,
                order_id: id,
            },
            devicesId: props.devices !== undefined ? props.devices : [],
            groupsId: props.group !== undefined ? props.group : [],
        };

        let device = props.device;
        if (props.action === "bloquear") {
            device.motive_lock = "locked";
        } else if (props.action === "desbloquear") {
            device.motive_lock = null;
        }

        let response;
        if (props.action === "desbloquear") {
            jsonTracking.data.statusTracking = false;
            response = await post_data("actions", [json, jsonTracking]);
        } else {
            if (tracking.statusTracking) {
                response = await post_data("actions", [json, jsonTracking]);
            } else {
                response = await post_data("actions", [json]);
            }
        }
        closeModal();
        if (response.data.result === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Acción realizada con éxito!",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
          await put_data("device", {
                id: device.id,
                motive_lock: device.motive_lock,
                //status_lock: device.status_lock
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error. No se pudo realizar la acción!",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    }

    let elements = elementsLocked(data, tracking);
    let screenElements = elements.slice(0,3);
    let othersElements = elements.slice(3,7);
    let trackingElements = elements.slice(7,14);

    if (props === undefined || props === null) {
        <Loading color="primary" />;
    } else {
        return (
            <>
                <Modal
                    show={props.show}
                    onHide={closeModal}
                    size="xl"
                    id="deviceLocked"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        className={styles.modalBody}
                        style={{ display:
                            props.configDefault === true || props.action === "desbloquear" ? 
                            "none"
                            : "block",
                        }}
                    >
                        <div className="card">
                            <Accordion activeIndex={[0]}>
                            <AccordionTab header="Opciones de Pantalla">
                            {screenElements && screenElements.map((el) => 
                                <div
                                    key={el.key}
                                    className={styleschecks.containerDiv}
                                    style={{justifyContent: "space-between", display: "flex"}}
                                >
                                    <label className={styleschecks.sliderLabel}>
                                        {el.label}
                                    </label>
                                    <label className={styleschecks.switch}>
                                        <input
                                            key={props.key}
                                            id={el.id}
                                            value={el.value}
                                            checked={el.value}
                                            name={el.name}
                                            onChange={(e)=> handleOnChange(e)}
                                            type="checkbox"
                                            className="focus"
                                        />
                                        <span className={`${styleschecks.slider} ${styleschecks.round} ${styleschecks.inputsLabels}`}/>
                                    </label>
                                </div>)}
                            </AccordionTab>
                            <AccordionTab header="Opciones de Posicionamiento y Seguimiento">
                            {trackingElements && trackingElements.map((el) => el.type === "checkbox" ? (
                                <div
                                    key={el.key}
                                    className={styleschecks.containerDiv}
                                    style={{justifyContent: "space-between", display: el.display === false? "none": "flex"}}
                                >
                                    <label className={styleschecks.sliderLabel}>
                                        {el.label}
                                    </label>
                                    <label className={styleschecks.switch}>
                                        <input
                                            key={props.key}
                                            id={el.id}
                                            value={el.value}
                                            checked={el.value}
                                            name={el.name}
                                            onChange={(e)=> handleOnChange(e)}
                                            type="checkbox"
                                            className="focus"
                                        />
                                        <span className={`${styleschecks.slider} ${styleschecks.round} ${styleschecks.inputsLabels}`}/>
                                    </label>
                                </div>)
                                : el.type === "number" ? (
                                <div
                                    className={styleschecks.containerDiv}
                                    id={`div${el.id}`}
                                    style={{justifyContent: "space-between", margin: "0px 0px 15px 0px", display: el.display === false? "none": "flex"}}
                                >
                                    <div>
                                        <label className={styleschecks.sliderLabel}>
                                            {el.label}
                                        </label>
                                        <small className="text-muted">
                                            {el.small}
                                        </small>
                                    </div>
                                    <div style={{width:"fit-content", justifyContent: "flex-end", display: "flex"}}>
                                        <input
                                            key={el.key}
                                            placeholder={el.placeholder}
                                            id={el.id}
                                            name={el.name}
                                            value={el.value}
                                            onChange={(e)=> handleOnChange(e)}
                                            type={el.type}
                                            style={{width:"4rem", textAlign: "center"}}
                                            className={styleschecks.focus}
                                        />
                                    </div>
                                </div>)
                                : el.type === "options" ? (
                                    <div 
                                        className={ styleschecks.containerDiv}
                                        style={{ display: el.display === false? "none": "flex", justifyContent: "space-between"}}
                                    >
                                        <label className={styleschecks.sliderLabel}>
                                            {el.label}
                                        </label>
                                        <select
                                            id={el.id}
                                            onChange={(e)=> handleOnChange(e)}
                                            class="form-control"
                                            style={{ width: "280px" }}
                                            name="resolution_images"
                                            defaultValue={"default"}
                                            className={styleschecks.focus}
                                        >
                                            <option
                                                value="default"
                                                disabled
                                            >
                                                {el.default}
                                            </option>
                                            {el.options && el.options.map((option) => (
                                                <option
                                                    value={option.value}
                                                >
                                                    {option.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ): null)}
                            </AccordionTab>
                            <AccordionTab header="Otras Opciones">
                            {othersElements && othersElements.map((el) => el.type === "checkbox" ? (
                                <div
                                    key={el.key}
                                    className={styleschecks.containerDiv}
                                    style={{justifyContent: "space-between", display: "flex"}}
                                >
                                    <label className={styleschecks.sliderLabel}>
                                        {el.label}
                                    </label>
                                    <label className={styleschecks.switch}>
                                        <input
                                            key={props.key}
                                            id={el.id}
                                            value={el.value}
                                            checked={el.value}
                                            name={el.name}
                                            onChange={(e)=> handleOnChange(e)}
                                            type="checkbox"
                                            className="focus"
                                        />
                                        <span className={`${styleschecks.slider} ${styleschecks.round} ${styleschecks.inputsLabels}`}/>
                                    </label>
                                </div>)
                                : el.type === "area" ? (
                                <div
                                    className={styleschecks.containerDiv}
                                    style={{display: el.display === false? "none": "flex", justifyContent: "space-between"}}
                                >
                                    <div style={{ width: "auto" }}>
                                        <label className={ styleschecks.sliderLabel}>
                                            {el.label}
                                        </label>
                                    </div>
                                    <div style={{ width: "60%" }}>
                                        <textarea
                                            key={el.key}
                                            style={{height: "7rem",resize: "none"}}
                                            placeholder={el.placeholder}
                                            id={el.id}
                                            name={el.name}
                                            value={el.value}
                                            onChange={(e)=> handleOnChange(e)}
                                            type={el.type}
                                            className={`${styles.inputModal} ${styles.inputUsers} ${styleschecks.focus}`}
                                        />
                                    </div>
                                </div>
                                ): el.type === "text" ? (
                                <div
                                    className={styleschecks.containerDiv}
                                    id={`div${el.id}`}
                                    style={{justifyContent: "space-between", margin: "0px 0px 15px 0px", display: el.display === false? "none": "flex"}}
                                >
                                    <div>
                                        <label className={styleschecks.sliderLabel}>
                                            {el.label}
                                        </label>
                                    </div>
                                    <div style={{width:"60%", justifyContent: "flex-end", display: "flex"}}>
                                        <input
                                            key={el.key}
                                            placeholder={el.placeholder}
                                            id={el.id}
                                            name={el.name}
                                            value={el.value}
                                            onChange={(e)=> handleOnChange(e)}
                                            type={el.type}
                                            style={{width:"100%"}}
                                            className={styleschecks.focus}
                                        />
                                    </div>
                                </div>
                            ): null)}
                            </AccordionTab>
                            </Accordion>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => closeModal()} variant="danger">
                            Cerrar
                        </Button>
                        <Button onClick={() => sendAction()} variant="primary" id="btnModalSucess">
                            Enviar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
