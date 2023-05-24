import React from "react";
import Info from "../Dashboards/info";
import VerticalBar from "../generals/charts/verticalBar";
import Loading from "../generals/loading";

export default function Wanted(querys) {
    //console.log(querys.data);
    let urls = querys.data;

    //función para ordenar querys
    function sortQuerys(data){
        let querys = data;
        let querysSorted = querys && querys.sort((query1, query2) => {
            return new Date(query2.date) - new Date(query1.date);
        }); 
        
        return querysSorted;
    };

    //función para crear el listado de querys y contar la cantidad de visitas por url
    function listOfQuerys(data){
        let querys = data;
        let querysDesc = sortQuerys(querys);
        let listQuerys = [];

        querysDesc.forEach(query =>{ 
            let index = listQuerys.findIndex((q)=>q.url===query.url);
            if( index === -1){
                listQuerys.push({
                    id: query.id,
                    url: query.url,
                    count: 1,
                    lastDate: query.date
                })  
            } else {
                listQuerys[index].count += 1;
            }
        });
        
        return listQuerys;
    };

    //function top3
    function creationOfTheTop3(data) {
        let top =[];
        let querys = data;
        let list = listOfQuerys(querys);
        top = list && list.slice(0, 3);

        return top;
    };
    
    const top3 = creationOfTheTop3(urls);

    //function top10
    function creationOfTheTop10(data) {
        let top =[];
        let querys = data;
        let list = listOfQuerys(querys);
        let listByCount = list.sort((query2, query1) => {
            return query1.count - query2.count;
        });

        top = listByCount && listByCount.slice(0, 10);
    
        return top;
    };

    const top10 = creationOfTheTop10(urls);

    const labelsTop10 = top10.map(({ url }) => {
        return url;
    });

    const dataTop10 = top10.map(({ count }) => {
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
                                        value={
                                            element.count !== 1
                                                ? element.count + " visitas"
                                                : element.count + " visita"
                                        }
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
