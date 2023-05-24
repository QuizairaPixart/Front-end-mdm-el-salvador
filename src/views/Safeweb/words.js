import React, { useState, useEffect } from "react";
import { get_data } from "../../actions/index";
import DataTableDemo from "../../components/generals/datatables/datatable";
import AddElement from "../../components/modals/addElementSafeweb";
import Header from "../../components/generals/header";
import Button from "react-bootstrap/Button";
import store from "../../reducer/store";
import "../../css/styles.css";
import styles from "../../css/devices/Devices.module.css";

export default function Words() {
    let { user } = store.getState();
    const [words, setWords] = useState(null);
    const [modal, setModal] = useState({
        show: false,
        type: "",
    });

    useEffect(() => {
        getWords();
    }, []);

    const getWords = async () => {
        let { data } = await get_data("safeweb/keyWords");
        setWords(data);
    };

    return (
        <div className="containerHeight content-wrapper">
            <Header title="Palabras Claves" />

            {user.range !== 3 ? (
                <div className={`container-toggle ${styles.btns}`}>
                    <Button
                        onClick={() =>
                            setModal({
                                show: true,
                                type: "palabra",
                            })
                        }
                        variant="dark"
                    >
                        <i
                            className="fas fa-plus-circle"
                            style={{ marginRight: "0.5rem" }}
                        ></i>
                        Nueva Palabra
                    </Button>
                </div>
            ) : (
                <></>
            )}

            <DataTableDemo
                reload={getWords}
                data={words}
                table="keyWords"
                rowStates={false}
                actionDashboard={false}
                editUsers={false}
                searchs={["keyword"]}
                columns={[
                    {
                        field: "keyword",
                        header: "Palabra",
                    },
                    {
                        field: "percent",
                        header: "Porcentaje %",
                    },
                ]}
            />
            {/*MODAL AGREGAR WORD */}
            <AddElement
                show={modal.show}
                action="keyWords"
                onHide={() =>
                    setModal({
                        type: "",
                        show: false,
                    })
                }
                reload={getWords}
                type={modal.type}
            />
        </div>
    );
}
