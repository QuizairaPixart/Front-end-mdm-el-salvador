export function jsonActionsGroups(handleModal) {
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
            label: "Bloquear",
            icon: "pi pi-lock",
            command: () => {
                handleModal("bloquear", true);
            },
        },
        {
            label: "Desbloquear",
            icon: "pi pi-lock-open",
            command: () => {
                handleModal("desbloquear", true);
            },
        },
    ];
}
