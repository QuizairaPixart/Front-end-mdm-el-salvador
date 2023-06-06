import React, { useState, useEffect } from "react";
import Header from "../../components/generals/header";
import styles from "../../css/reports/Reports.module.css";
import Doughnuts from "../../components/generals/charts/doughnut";
import Pie from "../../components/generals/charts/pie";
import BoxChart from "../../components/generals/boxCharts";
import KnobChart from "../../components/generals/charts/knob";
import Info from "../../components/Dashboards/info";
import VerticalBar from "../../components/generals/charts/verticalBar";
import Line from "../../components/generals/charts/line";
import DataTableLazy from "../../components/generals/datatables/dataTableLazy";
import { currentAndPreviousDate } from "../../components/generals/charts/utils/DatesFormats";
import { get_data } from "../../actions/index";

export default function Reports() {
  const [search, setSearch] = useState(null);
  const [querys, setQuerys] = useState(null);
  const [data, setData] = useState({
    map: null,
    charts: null,
    stats: null,
  });
  let day = currentAndPreviousDate(6, "-");
  let date = new Date(day[1]).toISOString().split("T")[0];

  const getReports = async () => {
    let json = {
      safeWeb: date,
    };

    let response = await get_data("reports", JSON.stringify(json));

    if (response) {
      setQuerys(response?.data?.safeWeb?.queryList);
      setSearch(response?.data?.safeWeb?.search);
      setData({
        stats: response?.data?.doughnutChart?.stats,
        charts: response?.data?.doughnutChart?.charts,
        map: response?.data?.doughnutChart?.map,
      });
    }
  };

  useEffect(() => {
    getReports();
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

  if (data) {
    return (
      <>
        <div className={styles.main_container}>
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
                {data.stats &&
                data.stats !== null &&
                data.stats.length !== 0 ? (
                  <Pie data={data?.stats} type="general" maxWidth="250px" />
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
                  <KnobChart data={data?.stats} type="general" size={200} />
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
                  <Doughnuts maxWidth={"270px"} data={data?.charts} />
                ) : (
                  <h5>Sin data a mostrar</h5>
                )}
              </BoxChart>
            </div>
            <div className={styles.dataTL}>
              <DataTableLazy table="reports" groupId={false} dateQuery={date} />
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
                <div className={styles.tops_container}>
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
                          : null}
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
                </div>
              </BoxChart>
            </div>
            <div className={styles.safeW}>
              <BoxChart
                margin="auto"
                width="100%"
                height="30rem"
                heightHeader="20%"
                heightBody="80%"
                title="Visitas"
                icon="pi pi-tags"
              >
                {querys && querys === null ? <p>Sin data a mostrar</p> : null}
                {querys && querys !== null ? (
                  <Line data={querys} ubication="SfWb-home" />
                ) : null}
              </BoxChart>
            </div>
          </div>
        </div>
      </>
    );
  }
}
