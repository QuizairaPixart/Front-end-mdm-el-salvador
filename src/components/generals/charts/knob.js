import React, { useState, useEffect } from "react";
import { Knob } from "primereact/knob";
import Loading from "../loading";
import style from "../../../css/generals/charts/Knob.module.css";
import "../../../css/globals.css";

export default function KnobChart({ data, type, size = 100, alert }) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        porcentage();
    }, [data]);

    function porcentage() {
        let total = 0;
        let available = 0;

        if (type === "general") {
            if (data !== null) {
                data.forEach((e) => {
                    if (e.ram.ram !== null) {
                        total = total + e.ram.ram.total;
                        available = available + e.ram.ram.available;
                    }
                });
                let porcentage = parseInt((available * 100) / total);
                setValue(100 - porcentage);
            }
        } else if (type === "individual") {
            total = data.ram.total;
            available = data.ram.available;
            let porcentage = Math.round((available * 100) / total);
            setValue(100 - porcentage);
        }
    }

    if(value === null){
        return (<Loading color="primary" />);
    } else if(value >= 0 && value<=100){
        return (
            <Knob
                className={type === "individual" ? style.spacePie : ""}
                readOnly
                value={value}
                valueTemplate={value + "%"}
                size={size}
                valueColor={alert && alert < value ? "#FF3023" : "#003686"}
                rangeColor={alert && alert < value ? "#FFB5B5" : "#007AFF"}
                textColor={"black"}
                onChange={(e) => setValue(e.value)}
            />
        );
    } else {
        return(<h5 className={style.messageError}>Error al cargar la información</h5>);
    }
    
}
