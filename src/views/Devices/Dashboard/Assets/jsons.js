import { formatDate } from "../../../../components/generals/charts/utils/DatesFormats";

export function jsonActionsSystemDevices(reboot_shutdown_restart, id) {
    //Despliegue de boton de acciones de sistema
    return [
        {
            label: "Formatear a Fábrica",
            icon: "pi pi-exclamation-triangle",
            command: () => {
                reboot_shutdown_restart("wipe", "Formatear a Fábrica", "devices", id);
            },
        },
        {
            label: "Reiniciar",
            icon: "pi pi-replay",
            command: () => {
                reboot_shutdown_restart("reboot", "Reiniciar", "devices", id);
            },
        },
        {
            label: "Apagar",
            icon: "pi pi-power-off",
            command: () => {
                reboot_shutdown_restart("shutdown", "Apagar", "devices", id);
            },
        },
    ];
}

export function jsonActionsContent(handleModal) {
    //Despliegue de boton de acciones de contenido
    return [
        {
            label: "Fondo de pantalla",
            icon: "pi pi-window-minimize",
            command: () => {
                handleModal("backgroundChange", true);
            },
        },
        {
            label: "Descarga de contenido",
            icon: "pi pi-download",
            command: () => {
                handleModal("contentDownload", true);
            },
        },
        {
            label: "Enviar Mensaje",
            icon: "pi pi-comment",
            command: () => {
                handleModal("message", true);
            },
        },
    ];
}

export function jsonActionsSecurityDevices(handleModal, data, deleted) {
    //Despliegue de boton de acciones de contenido
    return [
        {
            label: "Reportes",
            icon: "pi pi-chart-line",
            command: () => {
                handleModal("reports", true);
            }
        },
        {
            label:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "Desactivar Dispositivo"
                    : "Activar Dispositivo",
            icon:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "pi pi-times-circle"
                    : "pi pi-check-circle",
            command: () => {
                if (
                    data.data.status_lock === null ||
                    data.data.status_lock === false
                ) {
                    deleted("desactivar");
                } else {
                    deleted("activar");
                }
            },
        },
        {
            label:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "Bloquear Dispositivo"
                    : "Desbloquear Dispositivo",
            icon:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "pi pi-lock"
                    : "pi pi-lock-open",
            command: () => {
                if (
                    data.data.status_lock === null ||
                    data.data.status_lock === false
                ){
                    handleModal("bloquear", true);
                } else {
                    handleModal("desbloquear", true);
                }
            }
        },
    ];
}

export function jsonInfoDashboard(data) {
    return [
        {
            title: "Identificador",
            value: data.data.identity,
            icon: "fa-solid fa-mobile",
        },
        {
            title: "Última Conexión",
            value: formatDate(data.data.last_connection),
            icon: "fa-solid fa-clock",
        },
        {
            title: "Sistema Operativo",
            value: data.data.so,
            icon:
                data.data.so === "Android"
                    ? "fa-brands fa-android"
                    : "fa-brands fa-windows",
        },
        {
            title: "Estado",
            value:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "Desbloqueado"
                    : data.data.status_lock === "pending lock"
                    ? "Pendiente de bloqueo"
                    : data.data.status_lock === "pending unlock"
                    ? "Pendiente de desbloqueo"
                    : "Bloqueado",
            icon:
                data.data.status_lock === null ||
                data.data.status_lock === false
                    ? "fa-sharp fa-solid fa-unlock"
                    : "fa-sharp fa-solid fa-lock",
        },
    ];
}