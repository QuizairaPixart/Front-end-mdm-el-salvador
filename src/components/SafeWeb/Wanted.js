import React from "react";
import Info from "../Dashboards/info";
import VerticalBar from "../generals/charts/verticalBar";
import Loading from "../generals/loading";

export default function Wanted(querys) {
    //console.log(querys.data);
    
    //últimas 3 urls buscadas
    let top3 = querys?.data?.last;

    //Top 10 de las urls más buscadas

    let top10 = querys?.data?.most;

    const labelsTop10 = top10?.map(({ url }) => {
        return url;
    });

    const dataTop10 = top10?.map(({ count }) => {
        return count;
    });

    if (!querys) {
        return <Loading color="primary" />
    } else if(querys?.data?.length === 0){
        return (
            <div>
                <div style={{ width: "98%", height: "55%" }}>
                    <Info
                        icon="pi pi-bookmark"
                        title="Sin data a mostrar"
                        value="0 visitas"
                        width="100%"
                        height="30%"
                        marginBottom="2rem"
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "75vh",
                        marginTop: "2rem",
                    }}
                >
                </div>
            </div>
        )
} else {
        return (
            <div>
                <div style={{ width: "98%", height: "55%" }}>
                    {querys && querys.data === {} ? (
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
                            {top3 && top3 !== []
                                ? top3.map((element, index) => (
                                    <Info
                                        key={index}
                                        title={element.url}
                                        icon="pi pi-bookmark"
                                        width="100%"
                                        height="30%"
                                        marginBottom="2rem"
                                    />
                                ))
                                : null
                            }
                        </>
                    )}
                </div>
                {top10 && top10 === [] ? null : (
                    <div
                        style={{
                            width: "100%",
                            height: "75vh",
                            marginTop: "2rem",
                        }}
                    >
                        <VerticalBar
                            labels={labelsTop10}
                            title="Conexiones"
                            data={dataTop10}
                            backgroundColor={"#3F9BFF"}
                        />
                    </div>
                )}
            </div>
        );
    }
}