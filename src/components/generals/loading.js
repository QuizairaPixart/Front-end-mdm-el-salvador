import React from "react";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/generals/loading.css";

export default function Loading(props) {
    return (
        <div className="bodyLoading">
            <h4>Cargando...</h4>
            <Spinner color={props.color} />
        </div>
    );
}
