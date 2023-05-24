import React, { useState, useEffect } from "react";
import DataTableDemo from "../../components/generals/datatables/datatable";
import ModalGeneric from "./modal";
import "../../css/generals/paper.css";
import styles from "../../css/generals/Checkbox.module.css";
import Loading from "../generals/loading";
import { Button } from "primereact/button";

export default function ModalApps(props) {
    const [system, setSystem] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, [system]);

    function getData() {
        props.data.forEach((app) => {
            if (app.groupApp === 0) {
                app.category = "No Permitidas";
            } else if (app.groupApp === 1) {
                app.category = "Educativa";
            } else if (app.groupApp === 2) {
                app.category = "No Educativa";
            } else if (app.groupApp === 3) {
                app.category = "Productividad";
            } else if (app.groupApp === 4) {
                app.category = "Internet";
            } else if (app.groupApp === 5) {
                app.category = "Ocio";
            } else if (app.groupApp === 6) {
                app.category = "Otras";
            } else {
                app.category = "Sin asignar";
            }
        });

        if (!system) {
            setData(props.data.filter((app) => app.system === false));
        } else {
            setData(props.data);
        }
    }

    function onChange(e) {
        setSystem(e.target.checked);
    }

    function closeModal() {
        props.onHide();
    }

    return (
        <>
            <ModalGeneric
                {...props}
                show={props.show}
                onHide={props.onHide}
                size="xl"
                action="modalApps"
                id="modalApps"
                onClose={() => closeModal()}
                title="Aplicaciones"
                btnError="Cerrar"
                btnSuccess="Agregar"
                viewBtnSuccess={false}
            >
                <div className="buttonsApps">
                    <div>
                        <Button
                            type="button"
                            /* onClick={() => ()} */
                            className="p-button-success mr-2 uncheck"
                            style={{marginBottom:"0.2rem"}}
                            >
                            Instalar Aplicación
                        </Button>
                        <Button
                            type="button"
                            /* onClick={() => ()} */
                            className="p-button-success mr-2 uncheck"
                            style={{marginBottom:"0.2rem"}}
                            >
                            Desinstalar Aplicación 
                        </Button>
                    </div>
                    <div>
                        <label className={styles.sliderLabel}>Sistema</label>
                        <label className={styles.switch}>
                            <input
                                value={system}
                                checked={system}
                                onChange={onChange}
                                type="checkbox"
                                className="focus"
                            />
                            <span
                                className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
                            />
                        </label>
                    </div>
                </div>
                {data !== null ? (
                    <DataTableDemo
                        data={data}
                        actionDashboard={false}
                        actionDelete={false}
                        editUsers={false}
                        rowStates={false}
                        rowSelecteds={false}
                        exportCsv={false}
                        exportPdf={false}
                        searchs={["app"]}
                        columns={[
                            {
                                field: "app",
                                header: "Nombre",
                            },
                            {
                                field: "version",
                                header: "Version",
                            },
                            {
                                field: "category",
                                header: "Categoria",
                            },
                        ]}
                    />
                ) : (
                    <Loading color="primary" />
                )}
            </ModalGeneric>
        </>
    );
}
