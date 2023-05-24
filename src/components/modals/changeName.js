import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { put_data } from "../../actions/index";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import $ from "jquery";
import ModalGeneric from "./modal";
import { redirectIndex } from "../../components/generals/redirect";
import "../../css/generals/paper.css";

export default function ChangeName(props) {
    const user = useRef();
    const userData = useSelector((state) => state.user);
    const { id } = useParams();
    const [group, setGroup] = useState(props.data);

    const [data, setName] = useState({
        id: parseInt(id),
        name: "",
    });

    useEffect(() => {
        user.current = userData.userId;
    }, []);

    function handleOnChangeName(e) {
        if (props.type === "group") {
            setGroup({
                ...group,
                name: e.target.value,
            });
        } else {
            setName({
                ...data,
                name: e.target.value,
            });
        }
    }

    function closeModal() {
        props.onHide();
        setName({
            ...data,
            name: "",
        });
    }

    async function changeName() {
        $('#btnModalSucess').prop('disabled', true);
        if (
            (props.type === "group" && group.name !== "") ||
            (props.type === "device" && data.name !== "")
        ) {
            let response = await put_data(
                props.type === "group" ? "groups" : "device",
                props.type === "group" ? group : data
            );
            if (response.data.result === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Nombre modificado con éxito!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                props.reload();
            } else {
                if (
                    response.data.result === null &&
                    response.data.name === null
                ) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No se puede asignar un nombre vacio!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else if (
                    response.data.result === false &&
                    response.data.name === false
                ) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "El nombre de grupo ya existe!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else if (
                    response.data.result === null &&
                    response.data.id === null
                ) {
                    redirectIndex();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error al modificar el nombre!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            }
            props.onHide();
            setName({
                ...data,
                name: "",
            });
            setGroup({
                ...group,
                name: "",
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede asignar un nombre vacio!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
            closeModal();
        }
    }

    return (
        <>
            <ModalGeneric
                {...props}
                id="sendMessage"
                size="md"
                onChange={handleOnChangeName}
                onClose={closeModal}
                title="Cambiar Nombre"
                objects={[
                    {
                        key: "name",
                        label: "Nombre",
                        placeholder: "Nombre...",
                        /*value: props.type === "group" ? group.name : data.name,*/
                        name: "name",
                        type: "text",
                    },
                ]}
                btnError="Cerrar"
                actionError={closeModal}
                btnSuccess="Cambiar"
                actionSuccess={changeName}
            />
        </>
    );
}
