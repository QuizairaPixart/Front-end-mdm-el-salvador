import React, { useState, useEffect } from "react";
import DataTableDemo from "../../components/generals/datatables/datatable";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import ModalGeneric from "../../components/modals/modal";
import { get_data, post_data } from "../../actions/index";
import store from "../../reducer/store";
import $ from "jquery";
import Header from "../../components/generals/header";
import styles from "../../css/devices/Devices.module.css";

export default function Groups() {
    let { user } = store.getState();
    const [grupos, setGrupos] = useState(null);
    const [modal, setModal] = useState(false);
    const [group, setNewGroup] = useState({
        user_id: parseInt(user.userId),
        visible: true,
        name: "",
        users: [],
        devices: [],
    });

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        let response = await get_data("groups");
        setGrupos(response.data);
    };

    function handleOnChange(e) {
        setNewGroup({
            ...group,
            name: e.target.value,
        });
    }

    function closeModal() {
        setModal(false);
        setNewGroup({
            ...group,
            name: "",
        });
    }

    function deleted() {
        setNewGroup({
            ...group,
            name: "",
        });
        getGroups();
    }

    const createGroup = async () => {
        $('#btnModalSucess').prop('disabled', true);
        if (group.name !== "") {
            let { data } = await post_data("groups", group);

            if (data.result === true) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Grupo creado con éxito!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                getGroups();
            } else {
                if (data.result === false && group.name === "") {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No se puede crear grupos sin nombre!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                } else if (data.result === false && group.name !== "") {
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
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error al crear el grupo!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            }
            setModal(false);
            setNewGroup({
                ...group,
                name: "",
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede crear grupos sin nombre!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    };

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Grupos" />
            <div
                className={`container-toggle ${styles.btns}`}
                style={{ display: user.range === 1 ? "flex" : "none" }}
            >
                <Button onClick={() => setModal(true)} variant="dark">
                    <i
                        className="fas fa-users"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Nuevo grupo
                </Button>
            </div>

            <DataTableDemo
                data={
                    grupos && grupos !== null
                        ? grupos.filter((group) => group.visible !== false)
                        : []
                }
                reload={deleted}
                editUsers={false}
                rowStates={false}
                rowSelecteds={false}
                table="groups"
                searchs={["name"]}
                columns={[
                    {
                        field: "name",
                        header: "Nombre",
                    },
                ]}
            />

            {/* MODAL PARA CREAR GRUPO */}
            <ModalGeneric
                show={modal}
                onHide={() => setModal(false)}
                id="newGroup"
                onChange={handleOnChange}
                onClose={closeModal}
                title="Crear grupo"
                objects={[
                    {
                        key: "key1",
                        label: "Nombre",
                        placeholder: "Nombre...",
                        value: group.name,
                        name: "name",
                        type: "text",
                    },
                ]}
                btnError="Cerrar"
                actionError={closeModal}
                btnSuccess="Crear"
                actionSuccess={createGroup}
            />
        </div>
    );
}
