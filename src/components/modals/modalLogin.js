import React, { useState } from "react";
import $ from "jquery";
import LogoMDM from "../../img/mdm-logo.svg";
import { verifyUser } from "../../actions/index";
import PassIcon from "../../img/pass_icon.svg";
import UserIcon from "../../img/user_icon.svg";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import "../../css/modals/modalLogin.css";

export default function ModalLogin() {
    const [users, setUsers] = useState({});

    const [viewPasswords, setViewPasswords] = useState(false);

    const handleInputChange = (e) => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value,
        });
    };

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            addUser();
        }
    }

    async function addUser() {
        $('#btnLogin').prop('disabled', true);
        let data = await verifyUser(users);

        //console.log(data)

        if (data.error === true || data.data.auth === false) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error de verificacion!",
                showConfirmButton: false,
                timer: 1500,
            });
            setUsers({
                user: "",
                password: "",
                auth: false,
            });
            setTimeout(() => {
                $('#btnLogin').prop('disabled', false);
            }, 1500);
        } else if (data.data.auth === true) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Verificacion exitosa!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                setUsers(data.data);
            }, 2000);
            setTimeout(() => {
                $('#btnLogin').prop('disabled', false);
            }, 5000);
        }
    }

    if (users.auth) {
        return (
            <>
                <Navigate to="/mdm/home" />
            </>
        );
    } else {
        return (
            <div className="content-modal">
                <div className="title-login">
                    <img src={LogoMDM} alt="logo" />
                </div>
                <div className="conteiner-login">
                    <label className="slider-label">Nombre de usuario:</label>
                    <img src={UserIcon} alt="logo" />
                    <input
                        placeholder="Ingrese su usuario"
                        value={users.user}
                        name="user"
                        onChange={handleInputChange}
                        type="text"
                        className="inputs-labels focus password-label"
                    />

                    <label className="slider-label">Contraseña:</label>
                    <img src={PassIcon} alt="logo" />
                    <input
                        placeholder="Ingrese su contraseña"
                        value={users.password}
                        name="password"
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        type={
                            viewPasswords && viewPasswords === true
                                ? "text"
                                : "password"
                        }
                        className="inputs-labels focus password-label"
                    />
                    <span
                        className="buttonShow"
                        onClick={() => setViewPasswords(!viewPasswords)}
                    >
                        {viewPasswords && viewPasswords === true ? (
                            <i class="fas fa-eye"></i>
                        ) : (
                            <i class="fas fa-eye-slash"></i>
                        )}
                    </span>
                </div>
                <div className="content-button">
                    <Button
                        id="btnLogin"
                        onClick={() => addUser()}
                        className="button-login"
                    >
                        Ingresar
                    </Button>
                </div>
            </div>
        );
    }
}
