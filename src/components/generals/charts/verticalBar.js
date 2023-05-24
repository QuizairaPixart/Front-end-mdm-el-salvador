import React, { useState } from "react";
import { Chart } from "primereact/chart";
import "../../../css/styles.css";

export default function VerticalBar(props) {
    const useState = () => {
        let basicData = {
            labels: props.labels,
            datasets: [
                {
                    label: props.title,
                    backgroundColor: props.backgroundColor,
                    data: props.data,
                },
            ],
        };
        return {
            basicData,
        };
    };

    const { basicData } = useState();

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: "#3F9BFF",
                    },
                },
            },
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        color: "#495057",
                        font: {
                            size: 10,
                        },
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        return {
            basicOptions,
        };
    };

    const { basicOptions } = getLightTheme();

    return (
        <>
            <Chart
                type="bar"
                data={basicData}
                options={basicOptions}
                className="linebar"
                height="100%"
                width="95%"
            />
        </>
    );
}
