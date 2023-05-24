import React from "react";
import { Badge } from "primereact/badge";
import "../../css/generals/states.css";

export default function States(props) {
    return (
        <>
            {props.alert && props.alert.checkAlert ? (
                <Badge
                    value="!"
                    severity="danger"
                    className="alert"
                ></Badge>
            ) : (
                <></>
            )}

            <i
                className="pi pi-tablet"
                style={{
                    fontSize: "x-large",
                    color:
                        props.title === "Desbloqueado" ? "#08BE5B" : "#d82c2c",
                }}
            ></i>
        </>
    );
}
