import React from "react";
import { Avatar } from "primereact/avatar";
import { NavLink } from "react-router-dom";
import "../../css/generals/boxCharts.css";
import "../../css/styles.css";

export default function BoxChart(props) {
    return (
        <div
            className="containerBox"
            style={{
                width: props.width,
                height: props.height,
                margin: props.margin,
                padding: props.padding,
            }}
        >
            <div className="headerBox" style={{ height: props.heightHeader }}>
                <div className="content-avatar-title">
                    <Avatar
                        icon={props.icon}
                        className="mr-2"
                        size="large"
                        style={{ backgroundColor: "#E4E4E4", color: "black" }}
                        shape="circle"
                    />
                    <h5>{props.title}</h5>
                </div>
                {props.buttonHistoryUbications === true? (
                    <NavLink to={`/mdm/history/${props.id}`} 
                        className={`btn btn-dark`}
                        type="button"
                    >
                        {/* <i className="pi pi-map-marker" style={{ marginRight: "0.5rem" }}></i> */}
                        Ver mas ubicaciones
                    </NavLink>
                ): null}
            </div>
            <div className="bodyBox" style={{ height: props.heightBody }}>
                {props.children}
            </div>
        </div>
    );
}
