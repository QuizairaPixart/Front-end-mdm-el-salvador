import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { get_data, post_data, put_data } from "../../actions/index";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import DataTableDemo from "../../components/generals/datatables/datatable";
import Modal from "react-bootstrap/Modal";
import Header from "../../components/generals/header";
import stylesUsers from "../../css/users/Users.module.css";
import styles from "../../css/generals/Checkbox.module.css";
import "../../css/styles.css";

export default function Users() {
    const user = useSelector((state) => state.user);
    const [modals, setModals] = useState({
        create: false,
        edit: false,
        group: false,
    });
    const [selectedRows, setSelectedRows] = useState(false);
    const [data, setData] = useState();
    const [inputs, setInputs] = useState({
        user: "",
        name: "",
        last: "",
        password: "",
        phone: "",
        email: "",
        range: "",
        geo_id: 1,
    });
    const [newGroup, setNewGroup] = useState({
        user_id: parseInt(user.userId),
        visible: true,
        name: undefined,
        users: undefined,
    });
    const [edits, setEdits] = useState(false);
    const [emailEdits, setEmailEdits] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let response = await get_data("users", undefined, undefined);
        let users = response.data.filter(user => user.id !== 1);
        setData(users);
    };

    function showErrors(error, type) {
        if (type === "add") {
            if (error.user === false) {
                $("#user").addClass("error");
                $("#userError").text("Ya existe un usuario con este nombre");
            }
            if (error.email === false) {
                $("#email").addClass("error");
                $("#emailError").text("Ya existe un usuario con este email");
            }
        } else {
            if (error.user === false) {
                $("#editUser").addClass("error");
                $("#editUserError").text(
                    "Ya existe un usuario con este nombre"
                );
            }
            if (error.email === false) {
                $("#editEmail").addClass("error");
                $("#editEmailError").text(
                    "Ya existe un usuario con este email"
                );
            }
        }
    }

    function validationsForms(type) {
        let response = true;

        let messageRequire = "Este campo es Obligatorio";
        if (type === "add") {
            if (inputs.user === "") {
                $("#user").addClass("error");
                $("#userError").text(messageRequire);
                response = false;
            }
            if (inputs.name === "") {
                $("#name").addClass("error");
                $("#nameError").text(messageRequire);
                response = false;
            }
            if (inputs.last === "") {
                $("#last").addClass("error");
                $("#lastError").text(messageRequire);
                response = false;
            }
            if (inputs.password === "") {
                $("#password").addClass("error");
                $("#passwordError").text(messageRequire);
                response = false;
            }
            if (inputs.phone === "") {
                $("#phone").addClass("error");
                $("#phoneError").text(messageRequire);
                response = false;
            }
            if (inputs.email === "") {
                $("#email").addClass("error");
                $("#emailError").text(messageRequire);
                response = false;
            }
            if (inputs.range === "") {
                $("#range").addClass("error");
                $("#rangeError").text(messageRequire);
                response = false;
            }
            if (
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
                    inputs.email
                ) === false
            ) {
                $("#email").addClass("error");
                $("#emailError").text("Email con formato inválido");
                response = false;
            }
        } else {
            if (edits.user === "") {
                $("#editUser").addClass("error");
                $("#editUserError").text(messageRequire);
                response = false;
            }
            if (edits.name === "") {
                $("#editName").addClass("error");
                $("#editNameError").text(messageRequire);
                response = false;
            }
            if (edits.last === "") {
                $("#editLast").addClass("error");
                $("#editLastError").text(messageRequire);
                response = false;
            }
            if (edits.password === "") {
                $("#editPassword").addClass("error");
                $("#editPasswordError").text(messageRequire);
                response = false;
            }
            if (edits.phone === "") {
                $("#editPhone").addClass("error");
                $("#editPhoneError").text(messageRequire);
                response = false;
            }
            if (edits.email === "") {
                $("#editEmail").addClass("error");
                $("#editEmailError").text(messageRequire);
                response = false;
            }
            if (edits.range === "") {
                $("#editRange").addClass("error");
                $("#editRangeError").text(messageRequire);
                response = false;
            }
            if (
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
                    edits.email
                ) === false
            ) {
                $("#editEmail").addClass("error");
                $("#editEmailError").text("Email con formato inválido");
                response = false;
            }
        }
        return response;
    }

    const addUser = async () => {
        $('#btnModalSucess').prop('disabled', true);
        if (validationsForms("add")) {
            let { data } = await post_data("users", inputs);
            if (data.result === true) {
                setModals({
                    ...modals,
                    create: false,
                });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario creado con exito!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                getUsers();
            } else {
                showErrors(data, "add");
            }
        }
    };

    const editUser = async (id) => {
        $('#btnModalSucess').prop('disabled', true);
        if (validationsForms("edit")) {
            let response = await put_data("users", edits);

            if (response.data.result === true) {
                setModals({
                    ...modals,
                    edit: false,
                });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario actualizado con exito!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                getUsers();
            } else {
                showErrors(response, "edit");
            }
        }
    };

    function clearInputs() {
        setNewGroup({
            user_id: parseInt(user.userId),
            visible: true,
            name: undefined,
            users: undefined,
        });
    }

    const createGroup = async () => {
        $('#btnModalSucess').prop('disabled', true);
        if (newGroup.name !== "") {
            setModals({
                ...modals,
                group: false,
            });
            let { data } = await post_data("groups", newGroup);

            if (data.result === true) {
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
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
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

    function handleOnChange(e) {
        if (e.target.name === "range") {
            let range = parseInt(e.target.value);
            if (e.target.value !== "") {
                $(`#${e.target.id}`).removeClass("error");
                $(`#${e.target.id}Error`).text("");
            }
            setInputs({
                ...inputs,
                [e.target.name]: range,
            });
        } else {
            if (e.target.value !== "") {
                $(`#${e.target.id}`).removeClass("error");
                $(`#${e.target.id}Error`).text("");
            }
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
        }
    }

    function groupHandleOnChange(e) {
        if (e.target.name === "visible") {
            setNewGroup({
                ...newGroup,
                [e.target.name]: $("#visible").is(":checked"),
            });
        } else {
            setNewGroup({
                ...newGroup,
                [e.target.name]: e.target.value,
            });
        }
    }

    function editHandleOnChange(e) {
        if (e.target.name === "range") {
            let range = parseInt(e.target.value);
            if (e.target.value !== "") {
                $(`#${e.target.id}`).removeClass("error");
                $(`#${e.target.id}Error`).text("");
            }
            setEdits({
                ...edits,
                [e.target.name]: range,
            });
        } else {
            if (e.target.value !== "") {
                $(`#${e.target.id}`).removeClass("error");
                $(`#${e.target.id}Error`).text("");
            }
            setEdits({
                ...edits,
                [e.target.name]: e.target.value,
            });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        //console.log(inputs);
    }

    function blanquearForm() {
        setInputs({
            user: "",
            name: "",
            last: "",
            password: "",
            phone: "",
            email: "",
            range: "",
            geo_id: 1,
        });
        setModals({
            ...modals,
            create: true,
        });
    }

    function openEditUsers(data) {
        setEdits(data);
        setEmailEdits(data.email);
        setModals({
            ...modals,
            edit: true,
        });
    }

    function closeModal() {
        setModals({
            ...modals,
            edit: false,
        });
    }

    function showCreateGroup() {
        setModals({
            ...modals,
            group: true,
        });
        setNewGroup({
            ...newGroup,
            users: selectedRows.map((item) => item.id),
        });
    }

    const handleChange = (data) => {
        setSelectedRows(data);
    };

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Usuarios" />
            <section className={stylesUsers.containerToggle}>
                <Button
                    className={stylesUsers.btnDark}
                    onClick={() => showCreateGroup()}
                    variant="dark"
                >
                    <i
                        className="fas fa-users"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Nuevo grupo
                </Button>
                <Button
                    className={stylesUsers.btnDark}
                    onClick={() => blanquearForm()}
                    variant="dark"
                    style={{ marginLeft: "1rem" }}
                >
                    <i
                        className="fas fa-user"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Nuevo usuario
                </Button>
            </section>

            <Modal
                show={modals.group}
                size="md"
                onHide={() =>
                    setModals({
                        ...modals,
                        group: false,
                    })
                }
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear grupo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmit}>
                        <div
                            className="component-users"
                            style={{ display: "flex" }}
                        >
                            <label className={stylesUsers.labelUsers}>
                                <p
                                    style={{
                                        fontWeight: "500",
                                        marginRight: "1rem",
                                    }}
                                >
                                    Nombre:
                                </p>
                            </label>
                            <input
                                placeholder="Escriba el nombre..."
                                value={newGroup.name}
                                name="name"
                                onChange={groupHandleOnChange}
                                type="text"
                                className={styles.focus}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() =>
                            setModals({
                                ...modals,
                                group: false,
                            })
                        }
                        variant="danger"
                    >
                        Cerrar
                    </Button>
                    <Button onClick={() => createGroup()} variant="primary">
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={modals.create}
                size="md"
                onHide={() =>
                    setModals({
                        ...modals,
                        create: false,
                    })
                }
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Agregar usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmit} autoComplete="off">
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Usuario:{" "}
                            </label>
                            <input
                                placeholder="Escriba su usuario..."
                                value={inputs.user}
                                name="user"
                                onChange={handleOnChange}
                                type="text"
                                className={styles.focus}
                                id="user"
                            />
                            <p
                                id="userError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Nombre:{" "}
                            </label>
                            <input
                                placeholder="Escriba su nombre..."
                                value={inputs.name}
                                name="name"
                                onChange={handleOnChange}
                                type="text"
                                className={styles.focus}
                                id="name"
                            />
                            <p
                                id="nameError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Apellido:{" "}
                            </label>
                            <input
                                placeholder="Escriba su apellido..."
                                value={inputs.last}
                                name="last"
                                onChange={handleOnChange}
                                type="text"
                                className={styles.focus}
                                id="last"
                            />
                            <p
                                id="lastError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Contraseña:{" "}
                            </label>
                            <input
                                placeholder="Escriba su contraseña..."
                                value={inputs.password}
                                name="password"
                                onChange={handleOnChange}
                                type="password"
                                className={styles.focus}
                                id="password"
                            />
                            <p
                                id="passwordError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Teléfono:{" "}
                            </label>
                            <input
                                placeholder="Escriba su telefono..."
                                value={inputs.phone}
                                name="phone"
                                onChange={handleOnChange}
                                type="number"
                                className={styles.focus}
                                id="phone"
                            />
                            <p
                                id="phoneError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Email:{" "}
                            </label>
                            <input
                                placeholder="Escriba su email..."
                                value={inputs.email}
                                name="email"
                                onChange={handleOnChange}
                                type="email"
                                className={styles.focus}
                                id="email"
                            />
                            <p
                                id="emailError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Nivel de permiso:{" "}
                            </label>
                            <select
                                className={stylesUsers.selectUsers}
                                onChange={handleOnChange}
                                name="range"
                                value={inputs.range}
                                id="range"
                            >
                                <option value="" selected disabled>
                                    Seleccione un nivel de permiso
                                </option>
                                <option value={1}>Administrador</option>

                                <option value={2}>Escritura</option>
                                <option value={3}>Lectura</option>

                                {/* <option value={4}>Nacional</option>
                <option value={5}>Regional</option>
                <option value={6}>Departamental</option>
                <option value={7}>Municipal</option> */}
                            </select>
                            <p
                                id="rangeError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() =>
                            setModals({
                                ...modals,
                                create: false,
                            })
                        }
                        variant="danger"
                    >
                        Cerrar
                    </Button>
                    <Button onClick={() => addUser()} variant="primary">
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={modals.edit}
                onHide={() =>
                    setModals({
                        ...modals,
                        edit: false,
                    })
                }
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOnSubmit}>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Usuario:{" "}
                            </label>
                            <input
                                placeholder="Escriba su nombre de usuario..."
                                value={edits.user}
                                name="user"
                                onChange={editHandleOnChange}
                                type="text"
                                className={styles.focus}
                                id="editUser"
                            />
                            <p
                                id="editUserError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Nombre:{" "}
                            </label>
                            <input
                                value={edits.name}
                                name="name"
                                onChange={editHandleOnChange}
                                type="text"
                                className={styles.focus}
                                id="editName"
                            />
                            <p
                                id="editNameError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Apellido:{" "}
                            </label>
                            <input
                                value={edits.last}
                                name="last"
                                onChange={editHandleOnChange}
                                type="text"
                                className={styles.focus}
                                id="editLast"
                            />
                            <p
                                id="editLastError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Contraseña:{" "}
                            </label>
                            <input
                                placeholder={edits.password}
                                value={edits.password}
                                name="password"
                                onChange={editHandleOnChange}
                                type="password"
                                className={styles.focus}
                                id="editPassword"
                            />
                            <p
                                id="editPasswordError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Teléfono:{" "}
                            </label>
                            <input
                                placeholder="Telefono..."
                                value={edits.phone}
                                name="phone"
                                onChange={editHandleOnChange}
                                type="number"
                                className={styles.focus}
                                id="editPhone"
                            />
                            <p
                                id="editPhoneError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Email:{" "}
                            </label>
                            <input
                                placeholder="Email..."
                                value={edits.email}
                                name="email"
                                onChange={editHandleOnChange}
                                type="email"
                                className={styles.focus}
                                id="editEmail"
                            />
                            <p
                                id="editEmailError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                        <div className="component-users">
                            <label className={stylesUsers.labelUsers}>
                                Nivel de permiso:{" "}
                            </label>
                            <select
                                className={stylesUsers.selectUsers}
                                onChange={editHandleOnChange}
                                name="range"
                                value={edits.range}
                                id="editRange"
                            >
                                <option value="" selected disabled>
                                    Seleccione un nivel de permiso
                                </option>
                                <option value={1}>Administrador</option>
                                <option value={2}>Escritura</option>
                                <option value={3}>Lectura</option>
                                {/* <option value={4}>Nacional</option>
                                <option value={5}>Regional</option>
                                <option value={6}>Departamental</option>
                                <option value={7}>Municipal</option> */}
                            </select>
                            <p
                                id="editRangeError"
                                className={stylesUsers.errorMessage}
                            ></p>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => closeModal()} variant="danger">
                        Cerrar
                    </Button>
                    <Button onClick={() => editUser()} variant="primary">
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>

            <section>
                <div>
                    <DataTableDemo
                        data={data}
                        table="users"
                        editUsers={openEditUsers}
                        actionDashboard={false}
                        rowStates={false}
                        onSelecteds={handleChange}
                        reload={getUsers}
                        searchs={["user", "name", "last", "email", "phone"]}
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
                            /* {
                                field: "password",
                                header: "Contraseña",
                            },*/
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
                </div>
            </section>
        </div>
    );
}
