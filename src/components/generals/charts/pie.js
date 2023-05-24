import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "../../../css/generals/charts/pie.css";

export default function Pie({ data, type, maxWidth, alert }) {
    const [disk, setDisk] = useState({
        disponible: 1,
        utilizado: 0,
    });

    useEffect(() => {
        porcentage();
    }, []);

    function bytesToSize(bytes) {
        if (bytes === 0) return "0 Byte";
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2);
    }

    function porcentage() {
        let total = 0;
        let available = 0;
        let porcentage;
        if (type === "general") {
            if (data !== null) {
                data.forEach((el) => {
                    if (el.disk.disk !== null) {
                        total = total + el.disk.disk.total;
                        available = available + el.disk.disk.available;
                    }
                });
            }
            porcentage = Math.round((available * 100) / total);
        } else if (type === "individual") {
            total = bytesToSize(data.disk.total);
            available = bytesToSize(data.disk.available);
            porcentage = Math.round((available * 100) / total);
        }

        setDisk({
            disponible: porcentage,
            utilizado: 100 - porcentage,
        });
    }

    const chartData = {
        labels: [`Disponible`, `Utilizado`],
        datasets: [
            {
                data: [disk.disponible, disk.utilizado],
                backgroundColor: [
                    alert && alert < disk.utilizado ? "#FFB5B5" : "#007AFF",
                    alert && alert < disk.utilizado ? "#FF3023" : "#003686",
                ],
            },
        ],
    };

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: "#495057",
                },
            },
        },
    });

    return (
        <>
            <Chart
                type="pie"
                data={chartData}
                options={lightOptions}
                style={{ position: "relative", maxWidth: maxWidth }}
            />
            {/* <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "space-between",
                    justifyContent: "center",
                }}
            >
                <p>Disponible: {disk.disponible}%</p>
                <p>Utilizado: {disk.utilizado}%</p>
            </div> */}
        </>
    );
}
