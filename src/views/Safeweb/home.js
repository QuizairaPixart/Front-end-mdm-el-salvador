import React, { useState, useEffect } from "react";
import BoxChart from "../../components/generals/boxCharts";
import { get_data } from "../../actions/index";
import Header from "../../components/generals/header";
import Loading from "../../components/generals/loading";
import Line from "../../components/generals/charts/line";
import "../../css/Safeweb/home.css";
import Wanted from "../../components/SafeWeb/Wanted";
import { currentAndPreviousDate } from "../../components/generals/charts/utils/DatesFormats.js";


export default function SafeWeb() {
    const [data, setData] = useState({
        blackList:[],
        queryList:[],
        whiteList: []
    });

    const getSafeWeb = async () => {

        let date = currentAndPreviousDate(6, "-");
        let day = new Date (date[1]).toISOString().split("T")[0];
        let response = await get_data("safeweb/home", day);
        
        if(response){
            setData(response.data);
        }
    };

    useEffect(() => {
        getSafeWeb();
    }, []);

    if (!data) {
        return <Loading color="primary" />;
    } else {
        return (
            <div className="containerHeight content-wrapper">
                <Header title="SafeWeb" />
                <div className="headerHome">
                    <div className="SFWBList">
                        <BoxChart
                            margin="auto"
                            width="100%"
                            height="100%"
                            heightBody="80%"
                            title="Listas Negras"
                            icon="pi pi-bookmark-fill"
                        >
                            {data &&
                            data?.blackList?.length === 0 ? (
                                <p>Sin data a mostrar</p>
                            ) : (
                                <Line data={data?.blackList} ubication="SfWb-home" />
                            )}
                        </BoxChart>
                        <BoxChart
                            margin="auto"
                            width="100%"
                            height="100%"
                            heightBody="80%"
                            title="Listas Blancas"
                            icon="pi pi-bookmark"
                        >
                            {data &&
                            data?.whiteList?.length === 0 ? (
                                <p>Sin data a mostrar</p>
                            ) : (
                                <Line data={data?.whiteList} ubication="SfWb-home"/>
                            )}
                        </BoxChart>
                    </div>
                    <div className="SFWBList2">
                        <BoxChart
                            margin="auto"
                            width="100%"
                            height="100%"
                            heightBody="90%"
                            heightHeader="10%"
                            title="Ultimos Buscados"
                            icon="pi pi-history"
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    paddingBottom: "10px",
                                }}
                            >
                                <Wanted
                                    data={data?.search}
                                />
                            </div>
                        </BoxChart>
                    </div>
                </div>

                <div className="SFWBQuery">
                    <BoxChart
                        margin="auto"
                        width="100%"
                        height="30rem"
                        heightHeader="20%"
                        heightBody="80%"
                        title="Fuera De Listas"
                        icon="pi pi-tags"
                    >
                        {data &&
                        data?.queryList?.length === 0 ? (
                            <p>Sin data a mostrar</p>
                        ) : (
                            <Line data={data?.queryList} ubication="SfWb-home"/>
                        )}
                    </BoxChart>
                </div>
            </div>
        );
    }
}
