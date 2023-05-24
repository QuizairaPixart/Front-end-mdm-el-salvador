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

export default function ManageApps() {
    const location = useLocation();
    const { state } = location;
    const [category, setCategory] = useState({ name: "No Permitidas", id: 0 });
    const [categorys, setCategorys] = useState(state.categorys);
    const [apps, setApps] = useState(null);
    const toast = useRef(null);

    //Apps por actualizar
    const appsToPut = [];

    useEffect(() => {
        getApps(state.apps);
    }, []);

    function getApps (data){
        setApps(data);
    };

    const onCategoryChange = (e) => {
        setCategory(e.value);
    };

    const checkAppUpdate = (app) => {
        let appFound;
        if(appsToPut.length === 0){
            appsToPut.push(app);
        } else {
            appFound = appsToPut.find(item => (item.id === app.id));
            if(appFound === undefined){
                appsToPut.push(app);
            } else {
                appsToPut.forEach((item) => item.id === appFound.id? item.groupApp = app.groupApp: null); 
            }
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
        
        if(checkResponsePutApps(response.data)) {
            showToast(true);
        } else {
            showToast(false);
        }
        getApps(state.apps);
        appsToPut = [];
    };

    function checkResponsePutApps(response){
        let check = true;

        for(let i=0; i < response.length; i++){
            if(response[i].result === false){
                check = false;
                return check;
            }
        }
        return check;
    };

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
                        data={apps.sort((a,b)=>a.id-b.id)}
                        category={category}
                        update={checkAppUpdate}
                    />
                ) : (
                    <Loading color="primary" />
                )}
            </div>
        </div>
    );
}
