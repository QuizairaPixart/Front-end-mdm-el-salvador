import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import BoxApps from "../../components/Applications/boxApps";
import { Dropdown } from "primereact/dropdown";
import Loading from "../../components/generals/loading";
import ReturnButton from "../../components/generals/buttonReturn";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/applications/Apps.module.css";
import "../../css/styles.css";
import Header from "../../components/generals/header";
import Button from "react-bootstrap/Button";
import { put_data } from "../../actions/index";
import { Toast } from "primereact/toast";

const categorys = [
    { name: "Sistema", id: 1 },
    { name: "Educativas", id: 2 },
    { name: "No Educativas", id: 3 },
    { name: "Productividad", id: 4 },
    { name: "Internet", id: 5 },
    { name: "Ocio", id: 6 },
    { name: "Otras", id: 7 },
    { name: "No Permitidas", id: 0 },
];

export default function ManageApps() {
    const [category, setCategory] = useState({ name: "Sistema", id: 1 });
    const [apps, setApps] = useState(null);
    const location = useLocation();
    console.log(location)
    const { state } = location;
    const toast = useRef(null);

    //Apps por actualizar
    const [appsToPut, setAppsToPut] = useState([]);

    useEffect(() => {
        getApps(state);
    }, []);

    function getApps (data){
        setApps(data);
    };

    const onCategoryChange = (e) => {
        setCategory(e.value);
    };

    const checkAppUpdate = (app) => {
        let appFound = appsToPut.find((item) => item.id === app.id);
        if(appFound === undefined){
            return app;
        } else {
            appsToPut.forEach((item) => item.id === appFound.id? item.groupApp = app.groupApp: null);
            return undefined;
        }
    }

    const updateApps = (data) => {
        let app = checkAppUpdate(data);
        if (app !== undefined){
            setAppsToPut([...appsToPut, data]);
        }
    };

    function showToast(value) {
        if (value) {
            toast.current.show({
                severity: "success",
                summary: "Modificacion exitosa",
                life: 1000,
            });
        } else {
            toast.current.show({
                severity: "error",
                summary: "Modificacion fallida",
                life: 1000,
            });
        }
    };

    const putApps = async (data) => {
        let response = await put_data("applications", data);
        if (response.status === 200) {
            showToast(true);
        } else {
            showToast(false);
        }

        setAppsToPut([]);
    }

    return (
        <div className="content-wrapper containerHeight">
            <Header title="Gestión de Aplicaciones" />
            <Toast ref={toast} />
            <div className={styles.headerManager}>
                <div className={styles.buttonsManager}>
                    <ReturnButton redirect="applications" />
                    <Button onClick={() => putApps(appsToPut)} variant="dark" className={styles.buttonSave} id="button-update-apps">
                        <i
                            className="fas fa-save"
                            style={{ marginRight: "0.5rem" }}
                        ></i>
                        Guardar
                    </Button>
                </div>
                <Dropdown
                    value={category}
                    options={categorys}
                    onChange={onCategoryChange}
                    optionLabel="name"
                    placeholder="Seleccione categoria"
                    className={styles.dropdownCategorys}
                />
            </div>
            <div>
                {apps !== null ? (
                    <BoxApps
                        data={
                            category.id === 0
                                ? apps.filter((app) => app.system === false)
                                : apps
                        }
                        category={category}
                        update={updateApps}
                    />
                ) : (
                    <Loading color="primary" />
                )}
            </div>
        </div>
    );
}
