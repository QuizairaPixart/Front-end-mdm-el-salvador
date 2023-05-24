import React, { useState, useEffect } from "react";
import ModalGeneric from "../../components/modals/modal";
import { post_data } from "../../actions/index";
import SendMessages from "../../components/modals/sendMessage";
import Header from "../../components/generals/header";
import store from "../../reducer/store";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import $ from "jquery";
import styles from "../../css/devices/Devices.module.css";
import "../../css/styles.css";
import DataTableLazy from "../../components/generals/datatables/dataTableLazy";

export default function Devices() {
    let { user } = store.getState();
    const [data, setData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [modals, setModals] = useState({
        group: false,
        message: false,
    });
    const [newGroup, setNewGroup] = useState({
        user_id: parseInt(user.userId),
        name: "",
        devices: undefined,
    });
    const [clearSelected, setClearSelected] = useState(false);

    function clearInputs() {
        setNewGroup({
            user_id: parseInt(user.userId),
            name: undefined,
            devices: undefined,
        });
    }

    const createGroup = async () => {
        $('#btnModalSucess').prop('disabled', true);
        if (newGroup.name !== "") {
            let { data } = await post_data("groups", newGroup);
            setModals({
                ...modals,
                group: false,
            });

            if (data.result === true) {
                setClearSelected(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Grupo creado con exito!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                setSelectedRows([]); 
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al crear el grupo!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            }
            clearInputs(); 
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede crear un grupo sin nombre!",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    };

    const handleChange = (data) => {
        setSelectedRows(data);
    };

    function groupHandleOnChange(e) {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value,
        });
    }

    function showCreateGroup() {
        setModals({
            ...modals,
            group: true,
        });
        setNewGroup({
            ...newGroup,
            devices: selectedRows.map((item) => item.id),
        });
    }

    function showSendMessage() {
        setModals({
            ...modals,
            message: true,
        });
    }

    function closeModal() {
        setModals({ ...modals, group: false });
        newGroup({
            ...newGroup,
            name: "",
            devices: undefined,
        });
    }

    return (
        <div className="containerHeight content-wrapper">
            <Header title="Equipos" />
            <div
                className={`container-toggle ${styles.btns}`}
                style={{ display: user.range === 3 ? "none" : "flex" }}
            >
                <Button
                    onClick={() => showCreateGroup()}
                    variant="dark"
                    style={{ display: user.range === 1 ? "block" : "none" }}
                >
                    <i
                        className="fas fa-users"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Nuevo grupo
                </Button>
                <Button
                    style={{
                        display: data && data.length === 0 ? "none" : "block",
                    }}
                    onClick={() => showSendMessage()}
                    variant="dark"
                >
                    <i
                        className="fas fa-comment-dots"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Enviar Mensaje
                </Button>
            </div>
            <div>
                <DataTableLazy 
                    table="devices"
                    onSelecteds={handleChange}
                    groupId={false}
                    updateSelected={clearSelected}
                />
            </div>

            {/* MODAL PARA CREAR GRUPO */}
            <ModalGeneric
                show={modals.group}
                onHide={() => setModals({ ...modals, group: false })}
                id="newGroup"
                onChange={groupHandleOnChange}
                onClose={closeModal}
                title="Crear grupo"
                objects={[
                    {
                        key: "keyName",
                        label: "Nombre",
                        placeholder: "Nombre...",
                        value: newGroup.name,
                        name: "name",
                        type: "text",
                    },
                ]}
                btnError="Cerrar"
                actionError={closeModal}
                btnSuccess="Crear"
                actionSuccess={createGroup}
            />

            {/*MODAL ENVIAR MENSAJE*/}
            <SendMessages
                title="Enviar Mensaje"
                show={modals.message}
                onHide={() => setModals({ ...modals, message: false })}
                data={
                    data && data.map !== null ? data.map((item) => item.id) : []
                }
                devices={
                    selectedRows && selectedRows !== null
                        ? selectedRows.map((item) => item.id)
                        : []
                }
            />
        </div>
    );
}
