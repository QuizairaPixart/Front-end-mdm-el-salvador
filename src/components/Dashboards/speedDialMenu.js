import $ from "jquery";
import React from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import {
    jsonActionsSystemDevices,
    jsonActionsContent,
    jsonActionsSecurityDevices,
} from "../../views/Devices/Dashboard/Assets/jsons";
import {
    jsonActionsSystemGroups,
    jsonActionsSecurityGroups
} from "../../views/Groups/Dashboard/Assets/jsons";
import { Button } from 'primereact/button';
import { post_data } from "../../actions/index";
import Swal from "sweetalert2";
import styles from "../../css/Dashboards/SpeedDialMenu.module.css";

export default function SpeedDialMenu(props) {

    async function reboot_shutdown_restart(action, text, type, id) {

        let titleSwal = `${text}`;
        let textSwal = type === "devices"? `¿Está seguro que desea ${text.toLowerCase()} el dispositivo?`: `¿Está seguro que desea ${text.toLowerCase()} los dispositivos?`;
        let powerState = action;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        
        swalWithBootstrapButtons.fire({
            title: titleSwal,
            icon: "warning",
            text: textSwal,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                let json = {
                    action: "power_config",
                    data: {
                        powerState: powerState
                    },
                    date: new Date(Date.now()),
                    devicesId: props.type === "devices"? [parseInt(props.id)]: [],
                    groupsId: props.type === "groups"? [parseInt(props.idGroup)]: [],
                };
            
                let response = await post_data("actions", [json]);
                if ( (response.data.result === true)  && (!response.data.sendings.length !== 0) ){
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
        });
    }

    let itemsSystem = props.type === "devices"?
        jsonActionsSystemDevices(reboot_shutdown_restart, props.id)
        :jsonActionsSystemGroups(reboot_shutdown_restart, props.idGroup);

    let itemsContent = jsonActionsContent(props.onHide);

    let itemsSecurity = props.data !== null ? 
        props.type === "devices"? 
            jsonActionsSecurityDevices(props.onHide, props.data, props.deleted)
            :jsonActionsSecurityGroups(props.onHide, props.data, props.deleted)
    :[];

    function openMenuSpeedDial() {
        $('#i-btnMenuSpeedDial').toggleClass('btnIRight');
        $('#i-btnMenuSpeedDial').toggleClass('btnILeft');   
        $('.SpeedDialMenu_btnDial1__Wr9UJ').toggleClass(`${styles.openBtn}`);
        $('.SpeedDialMenu_btnDial2__Xbrzg').toggleClass(`${styles.openBtn}`);
        $('.SpeedDialMenu_btnDial3__JEjLj').toggleClass(`${styles.openBtn}`);
        $('#btnDial4').toggleClass(`${styles.openBtn}`);
    };

    return (
        <>
            <Button 
                severity="secondary"  
                className={styles.btnMenuSpeedDial}
                onClick={()=>openMenuSpeedDial()}
            >
                <i className="pi pi-plus btnILeft" id="i-btnMenuSpeedDial"></i>
            </Button>
            <div
                className={styles.menuSpeedDial}
                id="contentMenuSpeedDial"
            >
                <Tooltip
                    target=".p-speeddial-action"
                    position="top"
                />
                <SpeedDial
                    model={itemsSystem}
                    direction="left"
                    buttonClassName={styles.btnDial1}
                    type="linear"
                    showIcon="pi pi-power-off" 
                    hideIcon="pi pi-power-off"
                />
                <SpeedDial
                    model={itemsContent}
                    direction="left"
                    buttonClassName={styles.btnDial2}
                    type="linear"
                    showIcon="pi pi-send" 
                    hideIcon="pi pi-send"
                    style={{top: "4rem"}}
                />
                <SpeedDial
                    model={itemsSecurity}
                    direction="left"
                    buttonClassName={styles.btnDial3}
                    type="linear"
                    showIcon="pi pi-lock" 
                    hideIcon="pi pi-lock"
                    style={{top: "8rem"}}
                />
                <Button 
                    id="btnDial4"
                    icon="pi pi-th-large" 
                    severity="secondary" 
                    tooltip="Aplicaciones" 
                    tooltipOptions={{ position: 'left' }}
                    style={{top: "12rem"}}
                    className={styles.btnApps}
                    onClick={()=>props.onHide("apps", true)}
                />   
            </div>
        </>
    );
}