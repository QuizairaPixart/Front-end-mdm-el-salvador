import React, { useState, useEffect } from "react";
import { get_data } from "../../actions/index";
import DataTableDemo from "../../components/generals/datatables/datatable";
import Header from "../../components/generals/header";
import Button from "react-bootstrap/Button";
import AddElement from "../../components/modals/addElementSafeweb";
import store from "../../reducer/store";
import Loading from "../../components/generals/loading";
import "../../css/Safeweb/lists.css";

export default function Listas() {
    let { user } = store.getState();
    const [lists, setLists] = useState({});

    const [modal, setModal] = useState({
        action: false,
        show: false,
    });

    const getLists = async () => {
        let black = await get_data("safeweb/blackList");
        let white = await get_data("safeweb/whiteList");

        setLists({
            black: black.data,
            white: white.data,
        });
    };

    function showModal(list) {
        setModal({
            action: list,
            show: true,
        });
    }

    useEffect(() => {
        getLists();
    }, []);

    if (
        lists === {} ||
        lists.black === undefined ||
        lists.white === undefined
    ) {
        return (
            <div className="containerHeight content-wrapper">
                <Loading color="primary" />
            </div>
        );
    } else {
        return (
            <div className="containerHeight content-wrapper">
                <div style={{ marginBottom: "3rem" }}>
                    <Header title="Listas" />
                    <div className="tableHead">
                        <h4>Lista Negra</h4>
                        {user.range !== 3 ? (
                            <Button
                                onClick={() => showModal("blacklist")}
                                variant="dark"
                            >
                                <i className="fas fa-link" style={{marginRight: "0.5rem" }}></i>
                                Nueva Url
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>

                    <DataTableDemo
                        reload={getLists}
                        data={lists.black.filter(
                            (list) => list.suspect === false
                        )}
                        table="blackList"
                        rowSelecteds={false}
                        rowStates={false}
                        editUsers={false}
                        actionDashboard={false}
                        searchs={["url", "visits"]}
                        columns={[
                            {
                                field: "url",
                                header: "Url",
                            },
                            {
                                field: "count",
                                header: "Visitas",
                            },
                        ]}
                    />
                </div>
                <div>
                    <div className="tableHead">
                        <h4>Lista Blanca</h4>

                        {user.range !== 3 ? (
                            <Button
                                onClick={() => showModal("whitelist")}
                                variant="dark"
                            >
                                <i className="fas fa-link" style={{marginRight: "0.5rem" }}></i>
                                Nueva Url
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <DataTableDemo
                        reload={getLists}
                        data={lists.white}
                        table="whiteList"
                        rowSelecteds={false}
                        rowStates={false}
                        editUsers={false}
                        actionDashboard={false}
                        searchs={["url", "visits"]}
                        columns={[
                            {
                                field: "url",
                                header: "Url",
                            },
                            {
                                field: "count",
                                header: "Visitas",
                            },
                        ]}
                    />
                </div>

                <div style={{ marginTop: "2rem" }}>
                    <div className="tableHead">
                        <h4>Lista de Sospechosas</h4>
                    </div>
                    <DataTableDemo
                        reload={getLists}
                        data={lists.black.filter(
                            (list) => list.suspect === true
                        )}
                        table="suspect"
                        rowSelecteds={false}
                        rowStates={false}
                        editUsers={false}
                        actionDelete={false}
                        modifyLists={true}
                        actionDashboard={false}
                        searchs={["url", "visits"]}
                        columns={[
                            {
                                field: "url",
                                header: "Url",
                            },
                            {
                                field: "count",
                                header: "Visitas",
                            },
                        ]}
                    />
                </div>

                {/*MODAL AGREGAR URL */}
                <AddElement
                    show={modal.show}
                    onHide={() =>
                        setModal({
                            action: "",
                            show: false,
                        })
                    }
                    reload={getLists}
                    action={modal.action}
                    type="url"
                />
            </div>
        );
    }
}
