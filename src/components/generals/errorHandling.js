import Swal from "sweetalert2";
import { redirectIndex } from "../../components/generals/redirect";

export function errorHandling(response, petition) {
    //console.log(response);
    let object = {
        error: true,
        message: response.message,
        code: response.code
    };

    console.log(object);

    if(petition === "get" || petition === "post"){  
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',
            confirmButtonColor: '#d33',
        })
    }

    if (response.response.data !== undefined) {
        if(response.response.data.redirect){
            return redirectIndex();
        }
    }

    return object;
}