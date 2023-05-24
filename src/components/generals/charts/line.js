import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import Loading from "../loading";
import "../../../css/generals/charts/pie.css";
import { dateDiff, currentAndPreviousDate, reverseDateString } from "./utils/DatesFormats";

export default function Line(props) {
    //console.log(props);   
    let date = currentAndPreviousDate(6, "-");
    let today = date[0];

    let array = [
        { day: "", counter: 0 },
        { day: "", counter: 0 },
        { day: "", counter: 0 },
        { day: "", counter: 0 },
        { day: "", counter: 0 },
        { day: "", counter: 0 },
        { day: "", counter: 0 },
    ];

    let daysLabels = [];
    let arrayData = [];

    function days(days) {
        let date = new Date();
        date.setDate(date.getDate() - days);
        return date.getDate();
    }

    let day7 = days(0);
    let day6 = days(1);
    let day5 = days(2);
    let day4 = days(3);
    let day3 = days(4);
    let day2 = days(5);
    let day1 = days(6);

    function daysArray(date, day) {
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let dayArgument = day;
        if (dayArgument > date.getDate()) {
            if (month === 1) {
                month = 12;
                year -= 1;
            } else {
                month -= 1;
            }
        }
        return [day, month, year];
    }

    let day7Array = daysArray(today, day7);
    let day6Array = daysArray(today, day6);
    let day5Array = daysArray(today, day5);
    let day4Array = daysArray(today, day4);
    let day3Array = daysArray(today, day3);
    let day2Array = daysArray(today, day2);
    let day1Array = daysArray(today, day1);

    function labels(array) {
        let day = array[0];
        let dayLabel = day > 9 ? day : `0` + day;
        let month = array[1];
        let monthLabel = month > 9 ? month : `0` + month;
        let year = array[2];

        return `${dayLabel}-${monthLabel}-${year}`;
    };

    if(props?.ubication === "SfWb-home"){

        /* una vez subidos los cambios de back-end, quitar esta validación  */
        if(props?.data[0].day !== undefined){
            props?.data?.map(({ day }) => {
                daysLabels.push(reverseDateString(day));
            });
        };

        props?.data?.map(({ count }) => {
            arrayData.push(count);
        });
    } else {
        props?.data?.map(({ date }) => {
            let diff = dateDiff(new Date(date), 6, "-");
            if (diff < 7) {
                let index = diff;
                array[index].counter += 1;
            }
        });

        array.reverse();

        array[6].day = labels(day7Array);
        array[5].day = labels(day6Array);
        array[4].day = labels(day5Array);
        array[3].day = labels(day4Array);
        array[2].day = labels(day3Array);
        array[1].day = labels(day2Array);
        array[0].day = labels(day1Array);

        array.map(({ day }) => {
            daysLabels.push(day);
        });

        array.map(({ counter }) => {
            arrayData.push(counter);
        });
    }

    const useState = () => {
        let basicData = {
            labels: daysLabels,
            datasets: [
                {
                    label: "Cantidad de visitas",
                    data: arrayData,
                    fill: false,
                    borderColor: "#42A5F5",
                    tension: 0.4,
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
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
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
            {props?.data !== false ? (
                <Chart
                    type="line"
                    data={basicData}
                    options={basicOptions}
                    width="100%"
                    height="100%"
                />
            ) : (
                <Loading color="primary" />
            )}
        </>
    );
}
