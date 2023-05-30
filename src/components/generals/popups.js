import Swal from "sweetalert2";

export function popupSimple(icon, title) {
    
    const popup = Swal.fire({
        position: "center",
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 2000,
    })

    return (popup);
}