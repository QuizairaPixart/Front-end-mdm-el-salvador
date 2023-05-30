import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { get_data, put_data } from "../../../actions/index";
import Loading from "../../../components/generals/loading";
import { Toast } from "primereact/toast";
import store from "../../../reducer/store";
import LockedDevices from "../../../components/modals/lockeds";
import ButtonsAndTables from "../../../components/Dashboards/Groups/buttonsAndTable";
import ModalGeneric from "../../../components/modals/modal";
import ConfigReportGroups from "../../../components/modals/configReportsGroup";
import DataTableDemo from "../../../components/generals/datatables/datatable";
import SendMessages from "../../../components/modals/sendMessage";
import Header from "../../../components/generals/header";
import Swal from "sweetalert2";
import $ from "jquery";
import DataTableLazy from "../../../components/generals/datatables/dataTableLazy";
import SpeedDialMenu from "../../../components/Dashboards/speedDialMenu";
import ModalBackgroundChange from "../../../components/modals/modalBackgroundChange";
import ModalContentDownload from "../../../components/modals/modalContentDownload";

export default function DashboardGroup() {
    let { user } = store.getState();
    const toast = useRef(null);
    const { id } = useParams();
    const [action, setAction] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [data, setData] = useState(null);
    const [idsDevices, setIdsDevices] = useState(null);
    const [notGroup, setNotGroup] = useState({
        users: undefined,
        devices: undefined,
    });
    const [selectedRows, setSelectedRows] = useState({
        users: [],
        addUsers: [],
        devices: [],
        addDevices: [],
    });
    const [modalsShow, setModalsShow] = useState({
        name: false,
        message: false,
        locked: false,
        reports: false,
        addMembers: {
            addUsers: false,
            addDevices: false,
        },
    });

    useEffect(() => {
        getData().then(({ data }) => {
            getPreferencesLocked(data);
        });
        membersNotGroup();
    }, []);

    useEffect(() => {
        devicesSendMessage(selectedRows);
    }, [selectedRows]);

    const getData = async () => {
        let response = await get_data("group", id);
        //console.log("group:", response)
        setData(response.data);
        setIdsDevices(response.data.devices);

        return response;
    };

    const getPreferencesLocked = async (x) => {
        let response = await get_data("preferences", 1);
        //console.log(response);
        setPreferences(response.data);
    };

    function filterNotGroup(members) {
        let array = [];
        members.forEach((member) => {
            if (member.groups.length === 0) {
                array.push(member);
            } else {
                let search = member.groups.find(
                    (item) => item.id === parseInt(id)
                );
                if (search === undefined) {
                    array.push(member);
                }
            }
        });

        return array;
    }

    const filtered = (type, filters) => {
        let info = filters;
        let selecteds;
        if (type === "users") {
            selecteds = selectedRows.users;
        } else {
            selecteds = selectedRows.devices;
        }
        for (const selected of selecteds) {
            if (type === "users") {
                info.users = info.users.filter(
                    (item) => item.id !== selected.id
                );
            } else {
                info.devices = info.devices.filter(
                    (item) => item.id !== selected.id
                );
            }
        }
        let array = info;
        return array;
    };

    async function membersNotGroup() {
        let users = await get_data("users");
        let notUsers = filterNotGroup(users.data);
        notUsers = notUsers.filter(item =>item.id !== 1);
        setNotGroup({ ...notGroup, users: notUsers, devices: undefined });
    }

    async function addMembers(type) {
        let group = data;
        let newArray = [];
        $('#btnModalSucess').prop('disabled', true);
        if (type === "users") {
            if (selectedRows.addUsers.length === 0) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Debe seleccionar al menos 1 usuario!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            } else {
                if (group.users.length !== 0) {
                    newArray = group.users;
                }
                for (const selected of selectedRows.addUsers) {
                    newArray.push(selected);
                }
                setSelectedRows({ ...selectedRows, addUsers: [], users: [] });
                group.users = newArray;

                let response = await put_data("groups", group);
                if (response.data.result) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Insercion exitosa!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                    getData();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error en la insercion!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            }
        } else {
            if (selectedRows.addDevices.length === 0) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Debe seleccionar al menos 1 equipo!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            } else {
                if (group.devices.length !== 0) {
                    newArray = group.devices;
                }
                for (const selected of selectedRows.addDevices) {
                    newArray.push(selected);
                }
                setSelectedRows({ ...selectedRows, addDevices: [], devices: [] });
                group.devices = newArray;
                let response = await put_data("groups", group);
                if (response.data.result) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Insercion exitosa!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                    getData();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error en la insercion!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        $('#btnModalSucess').prop('disabled', false);
                    }, 1500);
                }
            }
        }

        setModalsShow({
            ...modalsShow,
            addMembers: {
                addDevices: false,
                addUsers: false,
            },
        });
        membersNotGroup();
    }

    async function deleteMembers(type) {
        $('#btnModalSucess').prop('disabled', true);
        if (
            (type === "users" && selectedRows.users.length === 0) ||
            (type === "devices" && selectedRows.devices.length === 0)
        ) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Debes seleccionar ${
                    type === "users" ? "los usuarios" : "los equipos"
                } que desea eliminar!`,
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        } else {
            let filters = filtered(type, data);
            setSelectedRows({ ...selectedRows, users: [],
                addUsers: [],
                devices: [],
                addDevices: []});
            let response = await put_data("groups", filters);
            if (response.data.result) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Eliminacion exitosa!",
                    showConfirmButton: false,
                    timer: 1500,
                }); 
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);  
                getData();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Eliminacion fallida!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            }
            membersNotGroup(); 
        }
    }

    function showAddMembers(type) {
        setModalsShow({
            ...modalsShow,
            addMembers: {
                ...modalsShow.addMembers,
                [type]: true,
            },
        });
    }

    function handleModal(type, boolean) {
        if (type === "desbloquear" || type === "bloquear") {
            setAction(type);
            setModalsShow({ ...modalsShow, locked: boolean });
        } else {
            setModalsShow({ ...modalsShow, [type]: boolean });
        }
    }

    const handleChange = (data, type) => {
        setSelectedRows({
            ...selectedRows,
            [type]: data,
        });
    };

    function closeModal(type) {
        setModalsShow({
            ...modalsShow,
            addMembers: {
                [type]: false,
            },
        });
        setSelectedRows({ 
            users: [],
            addUsers: [],
            devices: [],
            addDevices: []
        });
    }

    function devicesSendMessage(selected) {
        let devices = selected.devices;
        let ids = devices.map(device => device.id);
        setIdsDevices(ids);
    };

    if (data === null || preferences === null) {
        return (
            <div className="content-wrapper containerHeight">
                <Loading color="primary" />
            </div>
        );
    } else {
        return (
            <div className="content-wrapper containerHeight">
                <SpeedDialMenu
                    onHide={handleModal}
                    data={data}
                    //deleted={deleted}
                    idGroup={id}
                    type="groups"
                />
                <Toast ref={toast} />
                <Header 
                    title={data.name}
                    edit={true} 
                    data={data}
                    type="group"
                    reload={getData}
                />
                <div
                    className="speeddial-tooltip-demo"
                    style={{
                        position: "fixed",
                        display: user.range === 3 ? "none" : "flex",
                        top: "4rem",
                        right: "5rem",
                        zIndex: "999",
                    }}
                >
                </div>

                <div>
                    <h3 style={{marginTop: "2rem"}}>Usuarios</h3>
                    <ButtonsAndTables
                        delete={() => deleteMembers("users")}
                        add={() => showAddMembers("addUsers")}
                        table="users"
                        type="dataTableDemo"
                        rowStates={false}
                        actionDashboard={false}
                        actionDelete={false}
                        editUsers={false}
                        search={["name", "user", "last", "phone", "email"]}
                        onSelecteds={handleChange}
                        tableData={data.users}
                        columns={[
                            {
                                field: "user",
                                header: "Usuario",
                            },
                            {
                                field: "name",
                                header: "Nombre",
                            },
                            {
                                field: "last",
                                header: "Apellido",
                            },
                            {
                                field: "phone",
                                header: "Telefono",
                            },
                            {
                                field: "email",
                                header: "Email",
                            },
                        ]}
                    />

                    <h3 style={{marginTop: "2rem"}}>Equipos</h3>
                    <ButtonsAndTables
                        delete={() => deleteMembers("devices")}
                        add={() => showAddMembers("devices")}
                        table="devices"
                        search={["identity", "mac", "so", "last_connection"]}
                        rowStates={true}
                        actionDashboard={false}
                        actionDelete={false}
                        editUsers={false}
                        onSelecteds={handleChange}
                        tableData={data.devices}
                        type="dataTableDemo" 
                        columns={[
                            {
                                field: "name",
                                header: "Nombre",
                            },
                            {
                                field: "identity",
                                header: "Identificador",
                            },
                            {
                                field: "mac",
                                header: "Mac Address",
                            },
                            {
                                field: "IMEI",
                                header: "IMEI",
                            },
                        ]}
                    />
                </div>

                {/*MODAL PARA AGREGAR USUARIOS*/}
                <ModalGeneric
                    show={modalsShow.addMembers.addUsers}
                    onHide={() => closeModal("users")}
                    size="xl"
                    action="addUsers"
                    id="addUsers"
                    onClose={() => closeModal("users")}
                    title="Agregar Usuarios"
                    btnError="Cerrar"
                    btnSuccess="Agregar"
                    actionSuccess={() => addMembers("users")}
                >
                    <DataTableDemo
                        data={notGroup.users}
                        table="addUsers"
                        actionDashboard={false}
                        actionDelete={false}
                        searchs={["name", "user", "last", "phone", "email"]}
                        rowStates={false}
                        editUsers={false}
                        onSelecteds={handleChange}
                        columns={[
                            {
                                field: "user",
                                header: "Usuario",
                            },
                            {
                                field: "name",
                                header: "Nombre",
                            },
                            {
                                field: "last",
                                header: "Apellido",
                            },
                            {
                                field: "phone",
                                header: "Telefono",
                            },
                            {
                                field: "email",
                                header: "Email",
                            },
                        ]}
                    />
                </ModalGeneric>

                {/*MODAL PARA AGREGAR EQUIPOS*/}
                <ModalGeneric
                    show={modalsShow.addMembers.devices}
                    onHide={() => closeModal("devices")}
                    action="addDevices"
                    id="addDevices"
                    size="xl"
                    onClose={() => closeModal("devices")}
                    title="Agregar Equipos"
                    btnError="Cerrar"
                    btnSuccess="Agregar"
                    actionSuccess={() => addMembers("devices")}
                >
                    <DataTableLazy 
                        table="addDevices"
                        onSelecteds={handleChange}
                        groupId={id}
                    />
                </ModalGeneric>

                {/*MODAL CONFIGURACIONES DE REPORTES*/}
                <ConfigReportGroups
                    show={modalsShow.reports}
                    onHide={() => handleModal("reports", false)}
                />

                {/*MODAL ENVIAR MENSAJE*/}
                <SendMessages
                    type="dashboardGroup"
                    show={modalsShow.message}
                    onHide={() => handleModal("message", false)}
                    group={[parseInt(id)]}
                    devices={idsDevices}
                    title="Enviar Mensaje al Grupo"
                />

                {/*MODAL BLOQUEAR*/}
                    <LockedDevices
                    show={modalsShow.locked}
                    onHide={() => handleModal("locked", false)}
                    action={action !== null ? action : null}
                    preferences={
                        preferences && preferences !== null
                            ? preferences.defaultThief
                            : null
                    }
                    devices={[parseInt(id)]}

                    title={`Esta seguro que quiere ${action} los dispositivos del grupo?`}
                />
                

                {/*MODAL CAMBIO DE FONDO DE PANTALLA*/}
                <ModalBackgroundChange
                    show={modalsShow.backgroundChange}
                    onHide={() => handleModal("backgroundChange", false)}
                    title="Cambiar Fondo de Pantalla"
                    btnError="Cerrar"
                    btnSuccess="Enviar"
                    //group={[parseInt(id)]}
                    //devices={idsDevices}
                    type="groups"
                />

                {/*MODAL DE DESCARGA DE CONTENIDO*/}
                <ModalContentDownload
                    show={modalsShow.contentDownload}
                    onHide={() => handleModal("contentDownload", false)}
                    title="Descargar Contenido"
                    btnError="Cerrar"
                    btnSuccess="Enviar"
                    // group={[parseInt(id)]}
                    // devices={idsDevices}
                    type="groups"
                />
            </div>
        );
    }
}
