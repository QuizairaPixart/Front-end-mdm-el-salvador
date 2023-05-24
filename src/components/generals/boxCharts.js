import React from "react";
import { Avatar } from "primereact/avatar";
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
                <Avatar
                    icon={props.icon}
                    className="mr-2"
                    size="large"
                    style={{ backgroundColor: "#E4E4E4", color: "black" }}
                    shape="circle"
                />
                <h5>{props.title}</h5>
            </div>
            <div className="bodyBox" style={{ height: props.heightBody }}>
                {props.children}
            </div>
        </div>
    );
}
