import Swal from "sweetalert2";
import { Button } from "primereact/button";
import { delete_data, post_data } from "../../../actions";
import "../../../css/generals/sweetAlert.css";

export default function ModifyListSafe(props) {
    //console.log(props.data.url);
    async function moveList(type) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Esta seguro que desea moverlo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si!",
                cancelButtonText: "No, cerrar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let responseDelete = await delete_data(
                        `safeweb/blacklist`,
                        props.data.id
                    );
                    let json = {
                        url: props.data.url,
                        count: props.data.count,
                        suspect: true,
                    };
                    let responsePost = await post_data(`safeweb/${type}`, json);

                    if (responsePost.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Modificacion exitosa!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        props.reload();
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Modificacion fallida!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }

                    props.reload();
                }
            });
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
                style={{ marginRight: "1rem" }}
                aria-label="Cancel"
                onClick={() => moveList("whitelist")}
            >
                Lista Blanca
            </Button>
            <Button aria-label="Cancel" onClick={() => moveList("blacklist")}>
                Lista Negra
            </Button>
        </div>
    );
}
