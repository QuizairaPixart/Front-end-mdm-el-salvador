import React, { useState, useEffect, useRef } from "react";
import { post_data, put_data } from "../../actions/index";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import $ from "jquery";
import ModalGeneric from "./modal";
import Loading from "../generals/loading";
import { elementsLocked } from "./Assets/jsons";

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
                title: "Solicitud enviada con exito!",
                showConfirmButton: false,
                timer: 1400,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
          await put_data("device", {
             id: device.id,
             motive_lock: device.motive_lock,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al enviar la solicitud!",
                showConfirmButton: false,
                timer: 1400,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    }

    const elements = elementsLocked(data, tracking);

    if (props === undefined || props === null) {
        <Loading color="primary" />;
    } else {
        return (
            <>
                <ModalGeneric
                    show={props.show}
                    onHide={closeModal}
                    configDefault={props.configDefault}
                    size="md"
                    id="deviceLocked"
                    onChange={handleOnChange}
                    onClose={closeModal}
                    title={props.title}
                    btnError="Cerrar"
                    actionError={closeModal}
                    btnSuccess="Enviar"
                    actionSuccess={sendAction}
                    objects={elements}
                    action={props.action}
                />
            </>
        );
    }
}
