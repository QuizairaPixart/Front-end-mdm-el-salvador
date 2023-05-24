import Swal from "sweetalert2";
import { Button } from "primereact/button";
import { delete_data } from "../../../actions";
import "../../../css/generals/sweetAlert.css";

export default function ActionDelete(props) {
    async function deleted() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Esta seguro que desea eliminarlo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, borrar!",
                cancelButtonText: "No, cerrar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let trash;
                    if (
                        props.table === "keyWords" ||
                        props.table === "blackList" ||
                        props.table === "whiteList"
                    ) {
                        trash = await delete_data(
                            `safeweb/${props.table}`,
                            props.id
                        );
                    } else {
                        trash = await delete_data(props.table, props.id);
                    }

                    if (trash.data.result) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Eliminacion exitosa!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        props.reload(true);
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Eliminacion fallida!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            });
    }

    return (
        <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger btn-white"
            aria-label="Cancel"
            onClick={() => deleted()}
        />
    );
}
