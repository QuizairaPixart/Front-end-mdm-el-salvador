import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function LogOut({ component: Component }, props) {
    const [check, setCheck] = useState(true);
    const navigate = useNavigate();

    function checkSession() {
        if (
            sessionStorage.getItem("userId") === null &&
            sessionStorage.getItem("token") === null &&
            sessionStorage.getItem("range") === null
        ) {
            setCheck(false);
            navigate("/");
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Debe iniciar sesion nuevamente!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    useEffect(() => {
        checkSession();
    }, []);

    if (check) {
        return (
            <>
                <Component {...props} />
            </>
        );
    } else {
        return (
            <>
                <Navigate to="/mdm/home" />
            </>
        );
    }
}

export default LogOut;
