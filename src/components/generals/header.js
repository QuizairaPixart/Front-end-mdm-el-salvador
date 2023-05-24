import React from "react";
import "../../css/generals/header.css";
import HeaderEdit from "../../components/generals/headerEdit";

export default function Header(props) {
    if(props.edit === true) {
        return(
            <HeaderEdit
                title={props.title}
                data={props.data}
                type={props.type}
                reload={props.reload}
            />
        );
    } else {
        return (
            <div className="header">
                <h4 className="title">{`Dashboard ${props.title}`}</h4>
            </div>
        );
    }
    
}