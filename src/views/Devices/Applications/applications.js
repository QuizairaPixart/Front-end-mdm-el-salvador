import React, { useState, useEffect } from "react";
import { get_data } from "../../../actions/index";
import { useParams } from "react-router-dom";
import DataTableDemo from "../../../components/generals/datatables/datatable";
import Header from "../../../components/generals/header";
import "../../../css/styles.css";

export default function AppsDevice() {
    const { id } = useParams();

    const [apps, setApps] = useState([]);

    useEffect(() => {
        getApps();
    }, []);

    const getApps = async () => {
        let { data } = await get_data("device", id);
        setApps(data.applications);
    };

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Aplicaciones" />
            <DataTableDemo
                data={apps}
                actionDashboard={false}
                actionDelete={true}
                editUsers={false}
                rowStates={false}
                rowSelecteds={true}
                categorys={true}
                exportCsv={false}
                exportPdf={false}
                searchs={["app"]}
                columns={[
                    {
                        field: "app",
                        header: "Nombre",
                    },
                    {
                        field: "version",
                        header: "Version",
                    },
                ]}
            />
        </div>
    );
}
