export function jsonActionsSecurityGroups(handleModal, data, deleted) {
    //Despliegue de boton de acciones de contenido
    return [
        {
            label: "Activar Dispositivos",
            icon: "pi pi-check-circle",
            command: () => {
                //deleted("activar");
            }
        },
        {
            label: "Desactivar Dispositivos",
            icon: "pi pi-times-circle",
            command: () => {
                //deleted("desactivar");
            }
        },
        {
            label: "Desbloquear Dispositivos",
            icon: "pi pi-lock-open",
            command: () => {
                handleModal("desbloquear", true);
            }
        },
        {
            label: "Bloquear Dispositivos",
            icon: "pi pi-lock",
            command: () => {
                handleModal("bloquear", true);
            }
        },
    ];
}

export function jsonActionsSystemGroups(reboot_shutdown_restart, id) {
    //Despliegue de boton de acciones de sistema
    return [
        {
            label: "Reiniciar",
            icon: "pi pi-replay",
            command: () => {
                reboot_shutdown_restart("reboot", "Reiniciar", "groups", id);
            },
        },
        {
            label: "Apagar",
            icon: "pi pi-power-off",
            command: () => {
                reboot_shutdown_restart("shutdown", "Apagar", "groups", id);
            },
        },
    ];
}