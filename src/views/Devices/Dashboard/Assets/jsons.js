import { formatDate } from "../../../../components/generals/charts/utils/DatesFormats";


export function jsonActions(handleModal, data, deleted, navigate) {
    //Despliegue de boton de acciones principales
    return [
        {
            label: "Cambiar Nombre",
            icon: "pi pi-pencil",
            command: () => {
                handleModal("name", true);
            },
        },
        {
            label: "Enviar Mensaje",
            icon: "pi pi-comment",
            command: () => {
                handleModal("message", true);
            },
        },
        {
            label: "Aplicaciones",
            icon: "pi pi-th-large",
            command: () => {
                handleModal("apps", true);
            },
        },
        {
            label: "Ubicaciones",
            icon: "pi pi-map-marker",
            command: () => {
                navigate(`/mdm/history/${data.data.id}`);
            },
        },
        {
            label: "Reportes",
            icon: "pi pi-chart-line",
            command: () => {
                handleModal("reports", true);
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
                ) {
                    handleModal("bloquear", true);
                } else {
                    handleModal("desbloquear", true);
                }
            },
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
            label: "Apagar",
            icon: "pi pi-power-off",
            /* command: () => {
                navigate(`/mdm/history/${data.data.id}`);
            }, */
        },
        {
            label: "Reiniciar",
            icon: "pi pi-replay",
            /* command: () => {
                navigate(`/mdm/history/${data.data.id}`);
            }, */
        },
        {
            label: "Formatear de Fábrica",
            icon: "pi pi-wrench",
            /* command: () => {
                navigate(`/mdm/history/${data.data.id}`);
            }, */
        }
    ];
}

export function jsonActionsLecture(handleModal, data, deleted, navigate) {
    //Despliegue de boton de acciones principales
    return [
        {
            label: "Aplicaciones",
            icon: "pi pi-th-large",
            command: () => {
                handleModal("apps", true);
            },
        },
        {
            label: "Ubicaciones",
            icon: "pi pi-map-marker",
            command: () => {
                navigate(`/mdm/history/${data.data.id}`);
            },
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
            title: "Ultima Conexion",
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

