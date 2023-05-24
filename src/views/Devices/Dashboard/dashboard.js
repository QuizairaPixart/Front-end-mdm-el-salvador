import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { get_data, put_data, post_data } from "../../../actions/index";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import Loading from "../../../components/generals/loading";
import SendMessages from "../../../components/modals/sendMessage";
import Mapa from "../../../components/generals/map";
import store from "../../../reducer/store";
import Header from "../../../components/generals/header";
import Pie from "../../../components/generals/charts/pie";
import ModalApps from "../../../components/modals/modalApps";
import KnobChart from "../../../components/generals/charts/knob";
import VerticalBar from "../../../components/generals/charts/verticalBar";
import BoxChart from "../../../components/generals/boxCharts";
import LockedDevices from "../../../components/modals/lockeds";
import Info from "../../../components/Dashboards/info";
import ModalInforms from "../../../components/modals/modalInforms";
import ModalBackgroundChange from "../../../components/modals/modalBackgroundChange";
import ModalContentDownload from "../../../components/modals/modalContentDownload";
import { dateDiff, differenceTime } from "../../../components/generals/charts/utils/DatesFormats";
import { jsonInfoDashboard } from "./Assets/jsons";
import SpeedDialMenu from "../../../components/Dashboards/speedDialMenu";
import styles from "../../../css/Dashboards/DashDevices.module.css";
import styleChecks from "../../../css/generals/Checkbox.module.css";

export default function Dashboard() {
    let { user } = store.getState();
    const toast = useRef(null);
    const { id } = useParams();
    const [preferences, setPreferences] = useState(null);
    const [action, setAction] = useState("");
    const [data, setData] = useState({
        data: null,
        alarms: null,
        statusLocked: null,
    });
    const [labels, setLabels] = useState({
        data: null,
        labels: null,
        backgroundColor: null,
    });

    const getPreferencesLocked = async () => {
        let { data } = await get_data("preferences/thief", 1);
        setPreferences(data);
    };

    //Estados para mostrar o no los modales
    const [modalsShow, setModalsShow] = useState({
        message: false,
        lockeds: false,
        reports: false,
        apps: false,
        backgroundChange: false,
        contentDownload: false,
    });

    const getDevice = async () => {
        //Se trae los equipos y los carga en el estado para reenderizar
        let  {data}  = await get_data("device", id);
        let response = await get_data("preferences/reports", 1);

        if (data.stat.id !== null) {
            data.stat.Ram = data.stat.Ram[data.stat.Ram.length - 1];
            data.stat.Disk = data.stat.Disk[data.stat.Disk.length - 1];
        } else {
            data.stat.Ram = {
                avalaible: 0,
                total: 0,
            };
            data.stat.Disk = {
                avalaible: 0,
                total: 0,
            };
        }

        setData({
            data: data,
            alarms: {
                disk: response.data.percentDisk,
                ram: response.data.percentRam,
            },
            statusLocked: true,
        });

    };
    
    async function disabledAlarms() {
        if(data.data !== null){
            let stat = data.data.stat;

            if (stat.checkAlert) {
                let json = {
                    id: stat.id,
                    checkAlert: false,
                };

                let response = await put_data("stats", json);

                toast.current.show({
                    severity: "error",
                    summary: "Alerta de uso excesivo!",
                    sticky: true,
                });
            }
        }
    }

    async function formatConnections() {     
        let today = new Date();

        let array = [
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
            { day: "", counter: 0, backgroundColor: "#3F9BFF"},
        ];
    
        let daysLabels = [];
        let arrayData = [];
        let blackgroundColorData = [];
    
        function days(days) {
            let date = new Date();
            date.setDate(date.getDate() - days);
            return date.getDate();
        }
    
        let day7 = days(0);
        let day6 = days(1);
        let day5 = days(2);
        let day4 = days(3);
        let day3 = days(4);
        let day2 = days(5);
        let day1 = days(6);
    
        function daysArray(date, day) {
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let dayArgument = day;
            if (dayArgument > date.getDate()) {
                if (month === 1) {
                    month = 12;
                    year -= 1;
                } else {
                    month -= 1;
                }
            }
            return [day, month, year];
        }
    
        let day7Array = daysArray(today, day7);
        let day6Array = daysArray(today, day6);
        let day5Array = daysArray(today, day5);
        let day4Array = daysArray(today, day4);
        let day3Array = daysArray(today, day3);
        let day2Array = daysArray(today, day2);
        let day1Array = daysArray(today, day1);
    
        function labels(array) {
            let day = array[0];
            let dayLabel = day > 9 ? day : `0` + day;
            let month = array[1];
            let monthLabel = month > 9 ? month : `0` + month;
            let year = array[2];
    
            return `${dayLabel}-${monthLabel}-${year}`;
        }

        if(data.data !== null){
            let connections = data.data.connections;
            let firstDate;

            if (connections && (connections.length !== 0)) {
                
                connections.map((connection) => {
                    let diff = dateDiff(new Date(connection.date), 6, "-");
                    if (diff < 7) {
                        let index = diff;
                        array[index].counter += 1;
                        if(firstDate === undefined){
                            firstDate = connection.date;
                        } else {
                            let difference = differenceTime(new Date(firstDate), new Date(connection.date));
                            firstDate = connection.date;
                            if (difference <= 20){
                                array[index].backgroundColor = '#DC3545';
                            }
                        }
                    }
                });
        
                array.reverse();
        
                array[6].day = labels(day7Array);
                array[5].day = labels(day6Array);
                array[4].day = labels(day5Array);
                array[3].day = labels(day4Array);
                array[2].day = labels(day3Array);
                array[1].day = labels(day2Array);
                array[0].day = labels(day1Array);
        
                array.map(({ day }) => {
                    daysLabels.push(day);
                });
        
                array.map(({ counter }) => {
                    arrayData.push(counter);
                });

                array.map(({ backgroundColor }) => {
                    blackgroundColorData.push(backgroundColor);
                });
    
                setLabels({
                    data: arrayData,
                    labels: daysLabels,
                    backgroundColor: blackgroundColorData,
                });
            }
        }
    }

    //Va seteando el estado para reenderizar los modales
    function handleModal(type, boolean) {
        if (type === "bloquear" || type === "desbloquear") {
            setAction(type);
            setModalsShow({ ...modalsShow, lockeds: boolean });
        } else {
            setModalsShow({ ...modalsShow, [type]: boolean });
        }
    }

    // RECORDATORIO:  UNA VEZ QUE TENGA EL DATO PARA VER SI ESTA ACTIVADO O VER SI MANDO TRUE O FALSE EN TOUCH Y SCREEN

    //RECORDATORIO: VER JSON A MANDAR

    async function deleted(action) {
        let jsonAction = {
            alarm: false,
            touch: action === "activar" ? false : true,
            screen: action === "activar" ? false : true,
            background: false,
            usb: false,
            messageTitle: "",
            messageBody: "",
            changePassword: false,
            pass1: "",
            pass2: "",
            photo: {
                status: false,
                resolution: "low",
                recursive: false,
                time: 0,
            },
            brightness: {
                status: false,
                percentage: 50,
            },
        };

        let json = {
            action: "lock",
            data: {
                statusLock: action === "desactivar" ? true : false,
                order_id: Math.floor(
                    Math.random() * (1000000000000000 - 10 + 1) + 10
                ),
                preferences: jsonAction,
            },
            devicesId: [parseInt(id)],
            groupsId: [],
        };

        let device = data.data;
        if (action === "desactivar") {
            device.motive_lock = "disabled";
            device.status_lock = true;
        } else if (action === "activar") {
            device.motive_lock = null;
            device.status_lock = false;
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: `Esta seguro que desea ${
                    action === "activar" ? "activar" : "desactivar"
                } momentáneamente el dispositivo?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let { data } = await post_data("actions", [json]);
                    put_data("device", device);
                    getDevice();
                    if (data.result) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Acción realizada con éxito!",
                            text: `${
                                action === "activar"
                                    ? "Activacion"
                                    : "Desactivacion"
                            } exitosa!`,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error. No se pudo realizar la acción!",
                            text: `${
                                action === "activar"
                                    ? "Activacion"
                                    : "Desactivacion"
                            } fallida!`,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }
                }
            });
    }

    let infos = data.data !== null ? jsonInfoDashboard(data) : [];

    useEffect(() => {
        getDevice();
        getPreferencesLocked();  
    }, []);

    useEffect(() => {
        disabledAlarms();
        formatConnections();
    }, [data.data]);

    if (data.data === null || data.alarms === null) {
        return (
            <div className="content-wrapper containerHeight">
                <Loading color="primary" />
            </div>
        );
    } else {
        return (
            <div
                className="content-wrapper containerHeight"
                style={{ padding: "2rem 1.5rem" }}
            >
                <SpeedDialMenu
                    onHide={handleModal}
                    data={data}
                    deleted={deleted}
                    type="devices"
                    id={id}
                />
                <div>
                    <Toast ref={toast} position="bottom-right" />
                    <Header 
                        title={data.data.name}
                        edit={true} 
                        data={data.data}
                        type="device"
                        reload={getDevice}
                    />
                </div>

                <div className={styles.headerDash}>
                    <div className={styles.contents2}>
                        <div className={styles.info}>
                            {infos &&
                                infos.map((el) => {
                                    return (
                                        <Info
                                            key={el.title}
                                            title={el.title}
                                            value={el.value}
                                            icon={el.icon}
                                            className={styles.red}
                                            width="100%"
                                        />
                                    );
                                })}
                        </div>
                        <BoxChart
                            width="100%"
                            height="100%"
                            heightBody="80%"
                            title="Disco"
                            icon="fa-solid fa-floppy-disk"
                        >
                            {data.data && data.data.stat.id !== null ? (
                                <div className={styles.containerBoxChart}>
                                    <label className={styleChecks.sliderLabel}>
                                        Cantidad de alertas:
                                        {data.data.stat.countOverDisk ===
                                            null ||
                                        data.data.stat.countOverDisk === 0
                                            ? 0
                                            : data.data.stat.countOverDisk}
                                    </label>

                                    <Pie
                                        type={"individual"}
                                        data={{ disk: data.data.stat.Disk }}
                                        maxWidth="25rem"
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        height: "20rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <h3>No hay data para mostrar</h3>
                                </div>
                            )}
                        </BoxChart>
                    </div>
                    <div className={styles.contents}>
                        <BoxChart
                            width="100%"
                            height="100%"
                            heightBody="80%"
                            title="Conexiones"
                            icon="fa-solid fa-mobile"
                        >
                            {labels &&
                            labels.data !== null &&
                            labels.labels !== null ? (
                                <VerticalBar
                                    data={labels.data}
                                    labels={labels.labels}
                                    backgroundColor={labels.backgroundColor}
                                    title={"Conexiones"}
                                />
                            ) : (
                                <h3>No hay data para mostrar</h3>
                            )}
                        </BoxChart>
                        <BoxChart
                            width="100%"
                            height="100%"
                            heightBody="80%"
                            padding="5rem auto"
                            title="Ram"
                            icon="fa-solid fa-memory"
                        >
                            {data.data && data.data.stat.id !== null ? (
                                <div className={styles.containerBoxChart}>
                                    <label className={styleChecks.sliderLabel}>
                                        Cantidad de alertas:
                                        {data.data.stat.countOverRam === 0 ||
                                        data.data.stat.countOverRam === null
                                            ? 0
                                            : data.data.stat.countOverRam}
                                    </label>
                                    <KnobChart
                                        data={{ ram: data.data.stat.Ram }}
                                        alert={data.alarms.ram}
                                        type="individual"
                                        size={150}
                                    />
                                </div>
                            ) : (
                                <h3>No hay data para mostrar</h3>
                            )}
                        </BoxChart>
                    </div>
                </div>

                <section className={styles.bodyDash}>
                    <BoxChart
                        width="100%"
                        height="40rem"
                        heightBody="90%"
                        title="Geoposicionamiento"
                        icon="pi pi-map-marker"
                        buttonHistoryUbications={true}
                        id={id}
                    >
                        <Mapa info={data.data.location} type="last" />
                    </BoxChart>
                </section>

                {/*MODAL INFORMES*/}
                {data.data !== null ? (
                    <ModalInforms
                        id={id}
                        data={data.data.tracking}
                        show={modalsShow.reports}
                        onHide={() => handleModal("reports", false)}
                    />
                ) : null}

                {/*MODAL ENVIAR MENSAJE*/}
                <SendMessages
                    show={modalsShow.message}
                    onHide={() => handleModal("message", false)}
                    devices={[parseInt(id)]}
                    type="dashboard"
                    title="Enviar Mensaje"
                />

                {/*MODAL APLICACIONES*/}
                {data.data.applications && data.data.applications !== null ? (
                    <ModalApps
                        show={modalsShow.apps}
                        onHide={() => handleModal("apps", false)}
                        data={data.data.applications}
                        type="devices"
                    />
                ) : (
                    <></>
                )}

                {/*MODAL BLOQUEAR*/}

                {preferences !== null && data.data !== null ? (
                    <LockedDevices
                        device={data.data}
                        so={data.data.so}
                        preferences={preferences}
                        configDefault={
                            preferences.default === true ? true : false
                        }
                        action={action}
                        show={modalsShow.lockeds}
                        onHide={() => handleModal("lockeds", false)}
                        devices={[parseInt(id)]}
                        reload={getDevice}
                        title={`Esta seguro que quiere ${action} el dispositivo?`}
                    />
                ) : (
                    <></>
                )}

                {/*MODAL CAMBIO DE FONDO DE PANTALLA*/}
                <ModalBackgroundChange
                    show={modalsShow.backgroundChange}
                    onHide={() => handleModal("backgroundChange", false)}
                    title="Cambiar Fondo de Pantalla"
                    btnError="Cerrar"
                    btnSuccess="Enviar"
                    type="devices"
                />

                {/*MODAL DE DESCARGA DE CONTENIDO*/}
                <ModalContentDownload
                    show={modalsShow.contentDownload}
                    onHide={() => handleModal("contentDownload", false)}
                    title="Descargar Contenido"
                    btnError="Cerrar"
                    btnSuccess="Enviar"
                    type="devices"
                />
            </div>
        );
    }
}