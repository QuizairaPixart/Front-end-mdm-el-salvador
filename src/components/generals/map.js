import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";
import { config } from "../../config";
import styles from "../../css/devices/Ubications.module.css";
import "../../css/styles.css";

export default function Mapa({ info, type }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(info);
    }, [info]);

    if (data) {
        return (
            <MapContainer
                className="divMaps"
                center={
                    type === "last" ? [data.lat, data.lon] : config.map.center
                }
                zoom={config.map.zoom_specific}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data && type !== "last" ? (
                    data.map((element) =>
                        element.coordinates[0] &&
                        element.coordinates[1] !== null ? (
                            <Marker
                                key={element.device.id}
                                position={[
                                    element.coordinates[0],
                                    element.coordinates[1],
                                ]}
                            >
                                <Popup>
                                    <NavLink to={`/mdm/device/${element.device.id}`}> Ver Dispositivo</NavLink>
                                </Popup>
                            </Marker>
                        ) : null
                    )
                ) : (
                    data && data.place ? (
                        <Marker key={data.id} position={[data.lat, data.lon]}>
                            <Popup>
                                <div className={styles.popup}>
                                    <span>
                                        Ubicacion:
                                            {data.place}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ):(
                        <Marker key={data.id} position={[data.lat, data.lon]}>
                        </Marker>
                    )  
                )}
            </MapContainer>
        );
    } else {
        return (
            <MapContainer
                className="divMaps"
                center={config.map.center}
                zoom={config.map.zoom_general}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        );
    }
}
