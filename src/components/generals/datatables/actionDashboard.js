import { Button } from "primereact/button";
import { propTypes } from "react-bootstrap/esm/Image";
import { NavLink } from "react-router-dom";
import "../../../css/generals/dataTable.css";

export default function ActionDashboard(props) {
    return (
        <>
            <NavLink
                to={`/mdm/${props.type}/${props.id}`}
                className="nav-link hoverly"
            >
                <Button
                    icon="pi pi-ellipsis-h"
                    className="btn-white p-button-rounded"
                    aria-label="Search"
                />
            </NavLink>
        </>
    );
}
