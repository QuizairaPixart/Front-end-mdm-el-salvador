import React, { useState, useEffect } from "react";
import { get_data } from "../../../actions/index";
import { MapContainer, TileLayer, Marker, Popup,Polyline } from "react-leaflet";
import { config } from "../../../config";
import ReturnButton from "../../../components/generals/buttonReturn";
import { useParams } from "react-router-dom";
import styles from "../../../css/devices/Ubications.module.css";
import Header from "../../../components/generals/header";
import { formatDate } from "../../../components/generals/charts/utils/DatesFormats";

export default function Ubications() {
    const { id, type } = useParams();
    const [data, setData] = useState([]);
    const [line, setLine] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let { data } = await get_data("device", id);

        if (type === "geolocation") {
            
            let location = [
                {
                    coordinates: [
                        data.location.lat,
                        data.location.lon,
                        data.location.acc,
                        data.location.place,
                    ],
                },
            ];
            setData(location);
        } else {
            let result = data.locations.map(element => ([element.lat, element.lon]));
            setData(data.locations);
            setLine(result);
        }
        
    };

    if (data !== null) {
        return (
            <div className="content-wrapper containerHeight">
                {type === "geolocation" ? (
                    <Header title="Ultima ubicacion :" />
                ) : (
                    <Header title="Historial de ubicaciones :" />
                )}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <ReturnButton redirect={`device/${id}`} />
                </div>

                <MapContainer
                    id="mapDevice"
                    className={styles.mapHistory}
                    center={config.map.center}
                    zoom={config.map.zoom_specific}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                        positions={line} 
                        opacity={0.5}
                    >
                    </Polyline>
                    {data &&
                        data.map((element, key) =>
                            (element.lat === null ||
                            element.lon === null) ? null : (
                                <Marker
                                    key={key}
                                    position={[
                                        element.lat,
                                        element.lon,
                                        element.acc,
                                    ]}
                                >
                                    <Popup>
                                        <div className={styles.popup}>
                                            <span>
                                                Ubicacion:
                                                {element.place? element.place : [element.lat, ",", element.lon]}
                                            </span>
                                            <span>
                                                Fecha: 
                                                {formatDate(element.date)}
                                            </span>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                    )}
                </MapContainer>
            </div>
        );
    } else {
        <div></div>
    }
}
