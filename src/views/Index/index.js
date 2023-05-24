import React from "react";
import Header from "../../components/index/header";
import LogoRemoto from "../../img/app-1.png";
import LogoGeo from "../../img/geo-2.png";
import LogoGestion from "../../img/check-3.png";
import Arquitect from "../../img/mdm-arq.png";
import Logo from "../../img/img-device-conection-01.svg";
import Card from "../../components/index/card";
import Footer from "../../components/index/footer";
import styles from "../../css/Index.module.css";
import CardFunction from "../../components/index/cardFunctions";

export default function Index() {
    return (
        <>
            <Header />

            <main className={styles.bodyIndex}>
                <div className="container">
                    <div className={styles.contentTitles}>
                        <h1 className={styles.title}>
                            Mobile Device <br />
                            Management
                        </h1>
                        <h3 className={styles.subtitle}>
                            Administra dispositivos móviles <br />
                            sin importar el operador de telefonía.
                        </h3>
                    </div>
                    <div className={styles.spaceCards}>
                        <Card
                            logo={LogoRemoto}
                            title="Remoto"
                            text="Permite al cliente la instalación de aplicaciones
                            de forma remota que hayan sido dadas de alta en un 
                            servidor asociado a MDM."
                        />
                        <Card
                            logo={LogoGeo}
                            title="Geolocalización"
                            text="Consulta la ubicación precisa de todos los 
                            dispositivos en línea en un grupo de dispositivos 
                            e informa su última ubicación."
                        />
                        <Card
                            logo={LogoGestion}
                            title="Gestión"
                            text="Controla en una empresa el ecosistema de movilidad, 
                            desde el seguimiento de los activos físicos hasta 
						    la gestión de aplicaciones."
                        />
                    </div>
                </div>
            </main>

            <section className="container">
                <div className={styles.cardsFunctions}>
                    <CardFunction
                        icon={LogoGeo}
                        text="Instalación remota de aplicaciones, por medio del alta de un servidor."
                    />
                    <CardFunction
                        className={styles.contentCards}
                        icon={LogoGeo}
                        text="Obtención de geolocalización en equipos que no cuenten con GPS."
                    />
                    <CardFunction
                        className={styles.contentCards}
                        icon={LogoGeo}
                        text="Almacena registro en el servidor histórico de ubicaciones."
                    />
                    <CardFunction
                        className={styles.contentCards}
                        icon={LogoGeo}
                        text="Desinstalación remota de aplicaciones por medio de un alta en un servidor."
                    />
                    <CardFunction
                        className={styles.contentCards}
                        icon={LogoGeo}
                        text="Envío de geolocalización a una base de datos en un servidor determinado por un tiempo en el servidor."
                    />
                    <CardFunction
                        className={styles.contentCards}
                        icon={LogoGeo}
                        text="Generar inventario histórico de aplicaciones instaladas."
                    />
                </div>
            </section>

            <section className={styles.sectionArquitect}>
                <div className={styles.encabezados}>
                    <h2>
                        Arquitectura de <br />
                        la información
                    </h2>
                    <p>
                        Se instala en cada uno de los dispositivos que se desean
                        administrar, un servidor de <br />
                        implementación desde donde corre el MDM y una base de
                        datos donde se guardan todos <br />
                        los datos recabados. Los agentes mantienen una conexión
                        con el servidor a través de USB, <br />
                        Wi-Fi, GPRS, 3G o cualquier otro medio de transmisión de
                        datos, lo cual le permite al <br />
                        MDM tomar control del dispositivo.
                    </p>
                </div>
                <div className={styles.imgArquitect}>
                    <img src={Arquitect} alt="arquitectura" />
                </div>
            </section>

            <section className={styles.sectionFunctions}>
                <div className={styles.functions}>
                    <h2>
                        Funciones de Mobile <br />
                        Device Management
                    </h2>
                    <ul>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Administración individual o general de los equipos
                        </li>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Función de tracking configurable para uno o varios
                            equipos
                        </li>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Visualización mediante mapa de la última ubicación
                            de los equipos <br /> conectado
                        </li>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Administración individual o general de los equipos
                        </li>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Función de tracking configurable para uno o varios
                            equipos
                        </li>
                        <li>
                            <i className="fa-solid fa-circle-check"></i>
                            Visualización mediante mapa de la última ubicación
                            de los equipos <br /> conectado
                        </li>
                    </ul>
                </div>
                <div className={styles.imgFunctions}>
                    <img src={Logo} alt="funciones" />
                </div>
            </section>

            <Footer />
        </>
    );
}
