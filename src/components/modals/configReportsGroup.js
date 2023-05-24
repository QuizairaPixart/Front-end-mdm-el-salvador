import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { get_data, put_data } from "../../actions/index";
import Swal from "sweetalert2";
import $ from "jquery";
import ModalGeneric from "./modal";
import "../../css/generals/paper.css";
import Loading from "../generals/loading";

export default function ConfigReportGroups(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let { data } = await get_data("preferences/reports", id);
        //console.log(data);
        setData(data);
    };

    const handleOnChange = (e) => {
        if (e.target.type === "checkbox") {
            setData({
                ...data,
                [e.target.id]: $(`#${e.target.id}`).is(":checked"),
            });
        } else {
            if (e.target.name === "days") {
                setData({
                    ...data,
                    [e.target.name]: parseInt(e.target.value),
                });
            } else {
                setData({
                    ...data,
                    [e.target.name]: e.target.value,
                });
            }
        }
    };

    function closeModal() {
        props.onHide();
        setData(null);
    }

    async function saveData(e) {
        $('#btnModalSucess').prop('disabled', true);
        let response = await put_data("preferences/reports", data);
        if (response.data.result) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cambios guardados exitosamente!",
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
                title: "Error al guardar cambios!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                $('#btnModalSucess').prop('disabled', false);
            }, 1500);
        }
    }

    return (
        <>
            {data === null ? (
                <Loading color="primary" />
            ) : (
                <ModalGeneric
                    {...props}
                    id="sendMessage"
                    size="md"
                    onChange={handleOnChange}
                    onClose={closeModal}
                    title="Configuracion de Reportes"
                    objects={[
                        {
                            key: "overAlert",
                            label: "Activar Alarmas",
                            value: data.overAlert,
                            name: "overAlert",
                            id: "overAlert",
                            type: "checkbox",
                        },
                        {
                            key: "keyPercentRam",
                            display: data.overAlert,
                            label: "Ram Maxima permitida:",
                            value: data.percentRam,
                            id: "percentRam",
                            name: "percentRam",
                            type: "range",
                        },
                        {
                            key: "keyPercentDisk",
                            display: data.overAlert,
                            label: "Disco Maxima permitido:",
                            value: data.percentDisk,
                            id: "percentDisk",
                            name: "percentDisk",
                            type: "range",
                        },
                        {
                            key: "keyReportsDays",
                            label: "Activar Reportes",
                            value: data.reportsDays,
                            name: "reportsDays",
                            id: "reportsDays",
                            type: "checkbox",
                        },
                        {
                            key: "keyDays",
                            display: data.reportsDays,
                            label: "Activar Reportes",
                            value: data.days,
                            name: "days",
                            id: "days",
                            type: "number",
                        },
                    ]}
                    btnError="Cerrar"
                    actionError={closeModal}
                    btnSuccess="Cambiar"
                    actionSuccess={saveData}
                ></ModalGeneric>
            )}
        </>
    );
}
