import React, { useState, useEffect } from "react";
import Header from "../../components/generals/header";
import styles from "../../css/reports/Reports.module.css";
import Doughnuts from "../../components/generals/charts/doughnut";
import Pie from "../../components/generals/charts/pie";
import BoxChart from "../../components/generals/boxCharts";
import KnobChart from "../../components/generals/charts/knob";
import Info from "../../components/Dashboards/info";
import VerticalBar from "../../components/generals/charts/verticalBar";
import { currentAndPreviousDate } from "../../components/generals/charts/utils/DatesFormats";
import { get_data } from "../../actions/index";


export default function Reports() {

    const [search, setSearch] = useState(null);

    const [data, setData] = useState({
        map: null,
        charts: null,
        stats: null,
    });

    const getSafeWeb = async () => {
        let date = currentAndPreviousDate(6, "-");
        let day = new Date (date[1]).toISOString().split("T")[0];
        let response = await get_data("safeweb/home", day);
        
        if(response){
            setSearch(response.data.search);
        }
    };

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
        getSafeWeb();
    }, []);

    //últimas 3 urls buscadas
    let top3 = search?.last;

    //Top 10 de las urls más buscadas
    let top10 = search?.most;

    const labelsTop10 = top10?.map(({ url }) => {
        return url;
    });

    const dataTop10 = top10?.map(({ count }) => {
        return count;
    });

    if(data){
        return (
            <>  
                <div className={styles.main_container} >
                    <div className="container-fluid">
                        <Header title="Reportes" />
                        <div className={styles.spaceCharts}>
                            <BoxChart
                                width="100%"
                                heightBody="80%"
                                height="100% !important"
                                title="Disco"
                                icon="fa-solid fa-floppy-disk"
                            >
                            {data.stats && data.stats !== null && data.stats.length !== 0 ? (
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
                            {data.stats && data.stats !== null && data.stats.length !== 0 ? (
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
                            {data.charts && data.charts !== null && data.charts.length !== 0 ? (
                                <Doughnuts
                                    maxWidth={"270px"}
                                    data={data.charts}
                                />
                            ) : (
                                <h5>Sin data a mostrar</h5>
                            )}
                            </BoxChart>
                        </div>
                        <div className={styles.spaceSearch}>
                            <BoxChart
                                margin="auto"
                                width="100%"
                                height="100%"
                                heightBody="90%"
                                heightHeader="10%"
                                title="Ultimos Buscados"
                                icon="pi pi-history"
                            >
                                <div className={styles.top3_container}>
                                {search && search === null ? (
                                    <Info
                                        icon="pi pi-bookmark"
                                        title="Sin data a mostrar"
                                        value="0 visitas"
                                        width="100%"
                                        height="30%"
                                        marginBottom="2rem"
                                    />
                                ) : (
                                    <>
                                    {top3 && top3 !== [] ? top3.map((element, index) => (
                                        <Info
                                            key={index}
                                            title={element.url}
                                            icon="pi pi-bookmark"
                                            width="100%"
                                            height="30%"
                                            marginBottom="2rem"
                                        />
                                    )): null}
                                    </>
                                )}
                                </div>
                                
                                {top10 && top10 === [] ? null : (
                                    <div className={styles.top10_container}>
                                        <VerticalBar
                                            labels={labelsTop10}
                                            title="Conexiones"
                                            data={dataTop10}
                                            backgroundColor={"#3F9BFF"}
                                        />
                                    </div>
                                )}
                            </BoxChart>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}