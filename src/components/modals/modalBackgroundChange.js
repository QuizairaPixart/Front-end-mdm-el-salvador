import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useParams} from "react-router-dom";
import "../../css/generals/paper.css";
import styles from "../../css/modals/Modal.module.css";
import Swal from "sweetalert2";
import { post_data } from "../../actions/index";

export default function ModalBackgroundChange(props) {
    const { id } = useParams();
    const [files, setFiles] = useState(null);

    function closeModal() {
        props.onHide();
        setFiles(null);
    }

    function inputFileHandling(){
        let input = document.querySelector('#inputFileBC'); 

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

    const uploadImgs = async () => {
        let f = new FormData();

        if(files !== null){
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
    
            let response = await post_data("upload/wallpaper", f );
    
            if(response.data.length !== false){
                
                let url = response.data.url;
                url = url.trim();
                let splitUrl = url.split('/');
                installBackground(url, splitUrl);
                setFiles(null);
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
        } else {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "No se seleccionó ningún archivo!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const installBackground = async (url, fileName) => {
        let idsDevices = [];
        props?.devices?.forEach(devices =>{ idsDevices.push(devices.id)});

        let json = {
            action: "install",
            data: {
                fileName: fileName[fileName.length - 2]+"."+fileName[fileName.length - 1],
                url: url,
                type: "wallpaper"
            },
            date: new Date(Date.now()),
            devicesId: props.type === "devices"? [parseInt(id)]: idsDevices,
            groupsId: props.type === "groups"? [parseInt(id)]: [],
        };

        let response = await post_data("actions", [json]);

        if ( (response.data.result === true)  && (!response.data.sendings.length !== 0)){
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
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key={"backgroundChange"}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title" className={styles.modalTitle}>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.modalBackgroundChangeBody}>
                        <label>Seleccionar la imagen de fondo de pantalla:</label>
                        <input type="file" accept="image/*" id="inputFileBC" name="files" className={styles.fancy_file}/>
                        <label for="inputFileBC" className={styles.fancy_file_label}>
                            <span className={styles.fancy_file_button} onClick={()=> inputFileHandling()}>
                                <i className="pi pi-download"></i></span>
                            <span className={styles.fancy_file_name}>
                                <span id="fancy_file_name_document">Ningún archivo selccionado</span>
                            </span>   
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => closeModal()} variant="danger">
                        {props.btnError}
                    </Button>
                    <Button onClick={() => uploadImgs()} variant="primary" id="btnModalSucess" >
                        {props.btnSuccess}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}