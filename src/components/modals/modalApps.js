import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataTableDemo from "../../components/generals/datatables/datatable";
import ModalGeneric from "./modal";
import "../../css/generals/paper.css";
import styles from "../../css/generals/Checkbox.module.css";
import stylesModal from "../../css/modals/Modal.module.css";
import Loading from "../generals/loading";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import { post_data } from "../../actions/index.js";
import $ from "jquery";

export default function ModalApps(props) {
    const [system, setSystem] = useState(false);
    const [data, setData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [files, setFiles] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getData();
    }, [system]);

    useEffect(() => {
        setSelectedRows([]);
    }, [props]);

    function getData() {
        props.data?.forEach((app) => {
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
            setData(props.data?.filter((app) => app.system === false));
        } else {
            setData(props.data);
        }
    }

    function onChange(e) {
        setSystem(e.target.checked);
    };

    function closeModal() {
        props.onHide();
        setSelectedRows([]);
        setFiles(null);
    };

    const handleChange = (data) => {
        setSelectedRows(data);
    };

    async function uninstallApps(data) {
        let arrayApps = [];

        if(data.length !== 0){
            data.forEach(element => {
                let json = {
                    action: "uninstall",
                    data: {
                        package: element.package,
                    },
                    date: new Date(Date.now()),
                    devicesId: element.devicesApplication?.deviceId !== undefined ? [element.devicesApplication.deviceId] : [],
                    groupsId: [],
                }
                arrayApps.push(json);
            });

            let response = await post_data("actions", arrayApps);
            if ( !response.data.length !== 0 ){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Acción realizada con éxito!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error. No se pudo realizar la acción!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
            closeModal();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Debe seleccionar las aplicaciones a desinstalar!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    function insertApps() {
        $('#contentInstallApps').toggleClass('visible');
        $('#i-btn').toggleClass('btnIRight');
        $('#i-btn').toggleClass('btnILeft');
    };

    function inputFileHandling(){
        let input = document.querySelector('#fileToInstall'); 

        input.addEventListener('change', e => {
            let span = document.querySelector('#fancy_file_name_document'); 
            
            if(input?.files?.length === 0){
                span.innerHTML = "Ningún archivo selccionado";
            } else if(input?.files?.length > 0){
                span.innerHTML = input.files[0].name;
                setFiles(input.files);
            }
        });
    }

    const uploadApps = async () => {
        let f = new FormData();

        if(files === null){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Debe seleccionar la aplicación a instalar!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            for(let i=0; i<files.length; i++){
                f.append("files", files[i]);
            }
    
            let timerInterval;
    
             Swal.fire({
                title: '¡Enviando solicitud!',
                html: '',
                timer: 30000,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(500)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
    
            let response = await post_data("upload/install", f );
            if(response.data.result !== false){
                let url = response.data.url;
                url = url.trim();
                let splitUrl = url.split('/');
                installApps(url, splitUrl);
                closeModal();    
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "El proceso no pudo ser completado!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    const installApps = async (url, fileName) => {
        
        let json = {
            action: "install",
            data: {
                fileName: fileName[fileName.length - 2]+"."+fileName[fileName.length - 1],
                url: url,
                type: "apk"
            },
            date: new Date(Date.now()),
            devicesId: props.type === "devices"? [parseInt(id)]: [],
            groupsId: props.type === "groups"? [parseInt(id)]: [],
        };

        let response = await post_data("actions", [json]);

        if ( !response.data.length !== 0){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Acción realizada con éxito!",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error. No se pudo realizar la acción!",
                showConfirmButton: false,
                timer: 2000,
            });
        }
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
                onClose={closeModal}
                title="Aplicaciones"
                btnError="Cerrar"
                actionError={closeModal}
                viewBtnSuccess={false}
            >
                <div className="buttonsApps">
                {props.type !== "groups"? (
                    <div>              
                        <Button
                            type="button"
                            className={`p-button-success mr-2 uncheck ${styles.btn}`}
                            onClick={() => insertApps()}
                        >
                            <i className="pi pi-plus btnILeft" style={{ marginRight: '0.5rem' }} id="i-btn"></i>
                            Enviar
                        </Button>
                        
                        <Button
                        type="button"
                        onClick={() => uninstallApps(selectedRows)} 
                        className={`p-button-success mr-2 uncheck ${styles.btn}`}                        
                        >
                            <i className="pi pi-trash" style={{ marginRight: '0.5rem' }}></i>
                            Desinstalar
                        </Button>
                        
                    </div>
                    ):(<></>)}
                    {props.type !== "groups"? (<div>
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
                    </div>): (<></>)}
                </div>
                <div 
                    className = {
                        props.type === "groups"? 
                        `${styles.contentInputFile} ${styles.contentInputFileGroups}`: 
                        styles.contentInputFile
                    }
                    id="contentInstallApps"
                >
                    <label>Seleccionar la aplicación a instalar:</label>
                    <div className={styles.contentFileAndButton}>
                        <input type="file" accept=".apk" id="fileToInstall" name="files" className={stylesModal.fancy_file}/>
                        <label for="fileToInstall" className={stylesModal.fancy_file_label}>
                            <span className={stylesModal.fancy_file_button} onClick={()=> inputFileHandling()}>
                                <i className="pi pi-download"></i></span>
                            <span className={stylesModal.fancy_file_name}>
                                <span id="fancy_file_name_document">Ningún archivo selccionado</span>
                            </span>   
                        </label>
                        <Button
                            type="button"
                            onClick={() => uploadApps()} 
                            className={`p-button-success mr-2 uncheck ${styles.btn}`}
                        >
                            Instalar
                        </Button>
                    </div>
                </div>
                {props.type !== "groups"? data !== null ? (
                    <DataTableDemo
                        data={data}
                        actionDashboard={false}
                        actionDelete={false}
                        editUsers={false}
                        rowStates={false}
                        rowSelecteds={true}
                        exportCsv={false}
                        exportPdf={false}
                        searchs={["app"]}
                        onSelecteds={handleChange}
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
                ): (<></>)}
                
            </ModalGeneric>
        </>
    );
}