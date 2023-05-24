import React from "react";
import "../../css/applications/apps.css";

export default function App({ name, key }) {

    return (
        <div key={key} className="contentApp">
            <span>{name}</span>
        </div>
    );
}
