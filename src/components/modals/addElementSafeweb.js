import React, { useState } from "react";
import { post_data } from "../../actions/index";
import Swal from "sweetalert2";
import ModalGeneric from "./modal";
import $ from "jquery";

export default function AddElement(props) {
    const [url, setUrl] = useState({
        url: "",
        count: 0,
        suspect: true,
    });

    const [word, setWord] = useState({
        keyword: "",
        percent: 100,
    });

    function handleOnChange(e) {
        if (props.type === "url") {
            setUrl({
                ...url,
                url: e.target.value,
            });
        } else {
            e.target.value = e.target.value.trimStart();
           let string = e.target.value.trimEnd();

            setWord({
                ...word,
                [e.target.name]: string,
            });
        }
    }

    function closeModal() {
        if (props.type === "url") {
            setUrl({
                ...url,
                url: "",
            });
        } else {
            setWord({
                ...word,
                keyword: "",
                percent: 100,
            });
        }
        props.onHide();
    }

    async function newElement() {
        $('#btnModalSucess').prop('disabled', true);
        if (
            (props.action === "blacklist" || props.action === "whitelist") &&
            url.url === ""
        ) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede agregar una url vacia!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        } else if (props.action === "keyWords" && word.keyword === "") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede agregar una palabra vacia!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        } else {
            let response = await post_data(
                `safeweb/${props.action}`,
                props.type === "url" ? url : word
            );

            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Agregada con exito!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
                closeModal();
                props.reload();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al agregar!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    $('#btnModalSucess').prop('disabled', false);
                }, 1500);
            }
        }
    }

    let objectWord = [
        {
            key: "addWord",
            label: "Palabra",
            placeholder: "Ingrese la palabra",
            value: word.keyword,
            name: "keyword",
            type: "text",
            id: "keyword-addWord"
        },
        {
            key: "percentageWord",
            label: "Porcentaje",
            id: "percent",
            value: word.percent,
            name: "percent",
            type: "range",
        },
    ];

    let objectUrl = [
        {
            key: props.action === "black" ? "addBlack" : "addWhite",
            label: "Url",
            placeholder: "Ingrese la url...",
            value: url.url,
            name: "url",
            type: "text",
        },
    ];

    return (
        <>
            <ModalGeneric
                show={props.show}
                onHide={closeModal}
                size="md"
                id={`add${props.type}`}
                onChange={handleOnChange}
                onClose={closeModal}
                title={`Agregar ${props.type}`}
                objects={props.type === "palabra" ? objectWord : objectUrl}
                btnError="Cerrar"
                actionError={closeModal}
                btnSuccess="Agregar"
                actionSuccess={newElement}
            />
        </>
    );
}
