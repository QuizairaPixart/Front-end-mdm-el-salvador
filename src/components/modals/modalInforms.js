import React, { useState, useEffect } from "react";
import ModalGeneric from "./modal";
import { formatDate } from "../generals/charts/utils/DatesFormats";
import DataTableDemo from "../generals/datatables/datatable";

export default function ModalInforms(props) {
    const [data, setData] = useState({
        cases: null,
        ticket: null,
    });
    const [modal, setModal] = useState(false);

    /*function sanitizationData() {

        props.data.forEach((info) => {
            info.date_order = formatDate(info.date_order);
            if(info.date_order === "Invalid Date" || info.date_order === null) {
                info.date_order = "Sin fecha de comienzo";
            }
        });

        props.data.forEach((info) => {
            info.date_finish = formatDate(info.date_finish);
            if(info.date_finish === "Invalid Date" || info.date_finish === null) {
                info.date_finish = "Sin fecha de finalización";
            }
        });

        setData({
            ...data,
            cases: props.data,
        });
    }*/

    function viewTicket(info) {
        let array =
            info && info.tracking !== null ? JSON.parse(info.tracking) : [];
        setData({
            ...data,
            ticket: array,
        });
        props.onHide();
        setModal(true);
    }

    useEffect(() => {
        //sanitizationData();
    }, []);

    return (
        <>
            {/*MODAL DE TICKET DE ROBO*/}
            {/*data.ticket !== null && data.ticket !== undefined ? (*/}
                <ModalGeneric
                    show={modal}
                    onHide={() => setModal(false)}
                    size="xl"
                    id="tracking"
                    onClose={() => setModal(false)}
                    title="Tracking de extravio"
                    btnError="Cerrar"
                    btnSuccess="Agregar"
                    viewBtnSuccess={false}
                >
                    <DataTableDemo
                        data={data.ticket}
                        table="tickets"
                        rowSelecteds={false}
                        rowStates={false}
                        exportCsv={true}
                        exportPdf={true}
                        actionDashboard={false}
                        actionDelete={false}
                        searchs={["order_id"]}
                        editUsers={false}
                        columns={[
                            {
                                field: "place",
                                header: "Direccion",
                            },
                            {
                                field: "lat",
                                header: "Latitud",
                            },
                            {
                                field: "lon",
                                header: "Longitud",
                            },
                            {
                                field: "acc",
                                header: "Precision",
                            },
                            {
                                field: "ip_Lan",
                                header: "IP LAN",
                            },
                            {
                                field: "ip_wan",
                                header: "IP WAN",
                            },
                        ]}
                    />
                </ModalGeneric>
            {/*}) : null*/}

            {/*MODAL DE HISTORIAL DE ROBOS*/}
            {/*data.cases !== null && data.cases !== undefined ? (*/}
                <ModalGeneric
                    show={props.show}
                    onHide={props.onHide}
                    size="xl"
                    id="cases"
                    onClose={props.onHide}
                    title="Casos de Extravio"
                    btnError="Cerrar"
                    btnSuccess="Agregar"
                    viewBtnSuccess={false}
                >
                    <DataTableDemo
                        data={data.cases}
                        table="cases"
                        rowSelecteds={false}
                        rowStates={false}
                        exportCsv={true}
                        exportPdf={true}
                        actionDashboard={false}
                        actionDelete={false}
                        viewBtnAction={true}
                        navLink={true}
                        titleBtn="Ver Tracking"
                        actionBtn={viewTicket}
                        searchs={["order_id"]}
                        editUsers={false}
                        columns={[
                            {
                                field: "order_id",
                                header: "Numero de Extravio",
                            },
                            {
                                field: "date_order",
                                header: "Dia de comienzo",
                            },
                            {
                                field: "date_finish",
                                header: "Dia de finalizacion",
                            },
                        ]}
                    />
                </ModalGeneric>
            {/*) : null*/}
        </>
    );
}
