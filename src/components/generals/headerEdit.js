import React, { useState, useEffect, useRef } from "react";
import { put_data } from "../../actions/index";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { redirectIndex } from "../../components/generals/redirect";
import $ from "jquery";
import Swal from "sweetalert2";
import "../../css/generals/headerEdit.css";

export default function HeaderEdit(props) {
    const { id } = useParams();
    const [data, setName] = useState({
        id: parseInt(id),
        name: props.title,
    });
    const [group, setGroup] = useState(props.data);
    const user = useRef();
    const userData = useSelector((state) => state.user);
    let inputEdit = document.getElementById('input-header');

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
    };

    function messageInput() {
        $('#message-input').toggleClass('visible');
    };

    async function changeNameDevice() {
        let response = await put_data("device", data);
        if (response.data.result === true) {
        props.reload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Nombre modificado con éxito!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (response.data.result === null && response.data.id === null) {
            redirectIndex();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al modificar el nombre!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    async function changeNameGroup() {
        let response = await put_data("groups", group);
        if (response.data.result === true) {
            props.reload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Nombre modificado con éxito!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (response.data.result === false && response.data.name === false) {
            setGroup({
                ...group,
                name: props.data.name,
            });
            inputEdit.blur();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "El nombre de grupo ya existe!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (response.data.result === null && response.data.id === null) {
            redirectIndex();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al modificar el nombre!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    function nameChangeValidation() {
        if(props.type === "device" && props.title !== data.name){
            if(data.name === ""){
                setName({
                    ...data,
                    name: props.title,
                });
                inputEdit.blur();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se puede asignar un nombre vacio!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                changeNameDevice();
                inputEdit.blur();
            }
        } else if(props.type === "group" && props.title !== group.name){
            if(group.name === ""){
                setGroup({
                    ...group,
                    name: props.data.name,
                });
                inputEdit.blur();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se puede asignar un nombre vacio!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                changeNameGroup();
                inputEdit.blur();
            }
        } else {
            inputEdit.blur();
        }
    };

    function eventKeyUp (e) {
        if(e.key === "Enter"){
            nameChangeValidation();
        }
    };

    function eventClick(e) { 
        nameChangeValidation();
    };
    
    return (
        <div 
            className="header"
        >
            <h4 className="title">Dashboard</h4>
            <input type="text" className="input-edit-header" value={props.type === "device"?data.name: group.name} id="input-header" onMouseOver={()=> messageInput()} onMouseOut={()=> messageInput()} onChange={(e)=> handleOnChangeName(e)} onKeyUp={(e)=> eventKeyUp(e)} onBlur={(e)=> eventClick(e)}/>
            <div className="advert" id="message-input">
                <i class="fas fa-play previous"></i>
                <h5>Cambiar Nombre</h5>
            </div> 
        </div>
    );
}