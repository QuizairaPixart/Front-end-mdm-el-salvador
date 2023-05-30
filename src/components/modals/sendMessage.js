import React, { useState, useEffect, useRef } from "react";
import { post_data } from "../../actions/index";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ModalGeneric from "./modal";
import { popupSimple } from "../../components/generals/popups";
import $ from "jquery";
import "../../css/generals/paper.css";

export default function SendMessages(props) {
    //console.log(props);
    const { id } = useParams();
    const userData = useSelector((state) => state.user);
    const user = useRef();
    const [data, setData] = useState({
        title: "",
        message: "",
    });

    const [destiny, setDestiny] = useState("Todos");

    useEffect(() => {
        user.current = userData.userId;
    }, []);

    useEffect(() => {
        if (props.devices === [] || props.devices.length === 0) {
            setDestiny("Todos");
        } else {
            setDestiny("Seleccionados");
        }
    }, [props.devices]);

    function handleOnSendMessage(e) {
        if (e.target.id === "destiny") {
            setDestiny(e.target.value);
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
        }
    }

    function closeModal() {
        props.onHide();
        setData({
            title: "",
            message: "",
        });
    }

    async function sendMessage() {
        $('#btnModalSucess').prop('disabled', true);
        let json = {
            action: "message",
            data: {
                title: data.title,
                body: data.message,
                recursive: {
                    status: false,
                    repeat: 1,
                    finish: 5,
                },
            },
            devicesId: props.type === "dashboardGroup"? []: props.devices !== undefined ? props.devices : [],
            groupsId: props.type === "dashboard"? []:
                props.group !== undefined
                    ? props.group
                    : destiny === "Todos"
                    ? [1]
                    : [],
        };

        if (data.title !== "" && data.message !== "") {
            let response = await post_data("actions", [json]);
            if (props.type === "dashboard") {
                if (
                    (response.data.result === true) && (Array.isArray(response.data.sendings)) && (response.data.sendings.length === 0)
                ) {
                    popupSimple("success","Solicitud enviada con éxito!");
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else if (
                    (response.data.result === true) && (Array.isArray(response.data.sendings)) && (response.data.sendings.length > 0) && (response.data.sendings.includes(parseInt(id)))
                ) {
                    popupSimple("success","Acción realizada con éxito!");
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else {
                    popupSimple("error","Error. No se pudo realizar la acción!");
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            } else {
                if (response.data.result) {
                    popupSimple("success","Solicitud enviada con éxito!");
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else {
                    popupSimple("error","Error. No se pudo realizar la acción!");
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            }
            closeModal();
        } else {
            popupSimple("error","Error. Debe completar todos los campos!");
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    }

    let objectGeneral = [
        {
            key: "keytitle1",
            label: "Titulo:",
            placeholder: "Titulo...",
            value: data.title,
            name: "title",
            type: "text",
            id: "sendMessagesTitle"
        },
        {
            key: "keymsj2",
            label: "Mensaje:",
            value: data.message,
            placeholder: "Mensaje...",
            name: "message",
            type: "area",
            id: "sendMessagesMessage"
        },
        {
            key: "keySend",
            label: "Enviar a: ",
            value: destiny,
            id: "destiny",
            type: "options",
            default: destiny,
            options: props.devices && props.devices === [] || props.devices.length === 0 ? 
            [
                {
                    value: "Todos",
                    title: "Todos",
                }
            ] : [
                {
                    value: "Todos",
                    title: "Todos",
                },
                {
                    value: "Seleccionados",
                    title: "Seleccionados",
                }
            ],
            id: "sendMessagesDestiny"
        }
    ];

    let objectDash = [
        {
            key: "keytitle2",
            label: "Titulo",
            placeholder: "Titulo...",
            value: data.title,
            name: "title",
            type: "text",
            id: "sendMessagesTitleDash"
        },
        {
            key: "keymsj2",
            label: "Mensaje",
            value: data.message,
            placeholder: "Mensaje...",
            name: "message",
            type: "area",
            id: "sendMessagesMessageDash"
        },
    ];

    return (
        <>
            <ModalGeneric
                show={props.show}
                onHide={closeModal}
                size="md"
                id="sendMessage"
                onChange={handleOnSendMessage}
                onClose={closeModal}
                destiny={destiny}
                title={props.title}
                objects={
                    props.type === "dashboard"
                        ? objectDash
                        : objectGeneral
                }
                btnError="Cerrar"
                actionError={closeModal}
                btnSuccess="Enviar"
                actionSuccess={sendMessage}
            />
        </>
    );
}
