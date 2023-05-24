import React, { useState, useEffect } from "react";
import Doughnuts from "../../components/generals/charts/doughnut";
import Pie from "../../components/generals/charts/pie";
import BoxChart from "../../components/generals/boxCharts";
import KnobChart from "../../components/generals/charts/knob";
import Mapa from "../../components/generals/map";
import { get_data } from "../../actions/index";
import Header from "../../components/generals/header";
import styles from "../../css/Home.module.css";

export default function Home() {
    const [data, setData] = useState({
        map: null,
        charts: null,
        stats: null,
    });

    const getData = async () => {
        let response = await get_data("home");

        if(response.error === true){
            setData({
                map: null,
                charts: null,
                stats: null,
            });
        } else {
            setData({
                stats: response.data.stats,
                charts: response.data.charts,
                map: response.data.map,
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (data) {
        return (
            <div className="content-wrapper">
                <div className="content">
                    <div className="container-fluid">
                        <Header title="Home" />
                        <div className={styles.spaceCharts}>
                            <BoxChart
                                width="100%"
                                heightBody="80%"
                                height="100% !important"
                                title="Disco"
                                icon="fa-solid fa-floppy-disk"
                            >
                                {data.stats &&
                                data.stats !== null &&
                                data.stats.length !== 0 ? (
                                    <Pie
                                        data={data.stats}
                                        type="general"
                                        maxWidth="250px"
                                    />
                                ) : (
                                    <h5>Sin data a mostrar</h5>
                                )}
                            </BoxChart>
                            <BoxChart
                                width="100%"
                                heightBody="80%"
                                height="100% !important"
                                title="Ram"
                                icon="fa-solid fa-memory"
                            >
                                {data.stats &&
                                data.stats !== null &&
                                data.stats.length !== 0 ? (
                                    <KnobChart
                                        data={data.stats}
                                        type="general"
                                        size={200}
                                    />
                                ) : (
                                    <h5>Sin data a mostrar</h5>
                                )}
                            </BoxChart>
                            <BoxChart
                                width="100%"
                                heightBody="80%"
                                height="100% !important"
                                title="Conexiones de Equipos"
                                icon="pi pi-tablet"
                            >
                                {data.charts &&
                                data.charts !== null &&
                                data.charts.length !== 0 ? (
                                    <Doughnuts
                                        maxWidth={"270px"}
                                        data={data.charts}
                                    />
                                ) : (
                                    <h5>Sin data a mostrar</h5>
                                )}
                            </BoxChart>
                        </div>
                        <div className={styles.bodyHome}>
                            <BoxChart
                                width="100%"
                                heightBody="90%"
                                icon="pi pi-map-marker"
                                height="100%"
                                margin="1rem 0 2rem 0"
                                title="Geoposicionamiento"
                            >
                                <Mapa info={data.map} />
                            </BoxChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
