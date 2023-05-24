import { NavLink } from "react-router-dom";
import { Button } from "primereact/button";
import "../../../css/generals/dataTable.css";

export default function NavLinkButton(props) {
    return (
        <NavLink to={`/mdm/${props.url}`} className="nav-link hoverly">
            <Button className="p-button-secondary">{props.title}</Button>
        </NavLink>
    );
}
