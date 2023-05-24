/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Logo from "../../img/mdm-logo.svg";
import ModalLogin from "../modals/modalLogin";
import styles from "../../css/index/Header.module.css";

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <header className={styles.headerMain}>
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <nav className={styles.headerLinks}>
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="https://pixartargentina.com.ar/soluciones/">Soluciones</a>
          </li>
          <li>
            <a href="https://pixartargentina.com.ar/galeria/">Empresa</a>
          </li>
          <li>
            <a href="https://winnovo.mercadoshops.com.ar/?mshops-cookie-isguest=true&mshops-redirection-timestamp=1657569989488">
              Stock
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.headerContacts}>
        <div>
          <h6>Telefono</h6>
          <span>(+54)11 4300-5900</span>
        </div>
        <div>
          <h6>Email</h6>
          <span>info@pixartargentina.com.ar</span>
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          onClick={() => (!show ? setShow(true) : setShow(false))}
          className="boton"
          variant="primary"
        >
          Acceder
        </Button>
      </div>
      <div
        className={styles.modal}
        style={{
          display: show && show === true ? "flex" : "none",
        }}
      >
        <ModalLogin />
      </div>
    </header>
  );
}
