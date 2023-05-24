import React from "react";
import "../../css/generals/header.css";

export default function Header(props) {
    return (
        <div 
            className="header"
            >
            <h4 
                className="title"
            >{props.title}</h4>
        </div>
    );
}
