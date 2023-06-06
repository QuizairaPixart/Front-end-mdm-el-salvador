import React, { useState, useEffect } from "react";
import { get_data, put_data } from "../../../actions/index";
import Header from "../../../components/generals/header";
import Button from "react-bootstrap/Button";
import $ from "jquery";
import Loading from "../../../components/generals/loading";
import Swal from "sweetalert2";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import "../../../css/preferences/reports.css";
import styles from "../../../css/generals/Checkbox.module.css";
import stylesPreferences from "../../../css/preferences/Preferences.module.css";
import "../../../css/styles.css";
import { compareObj } from "../../../components/generals/toolsFunctions";

export default function Reports() {
  const [data, setData] = useState({});
  const [groups, setGroups] = useState(null);
  const [group, setGroup] = useState(null);
  const [settingsToCompare, setsettingsToCompare] = useState({});

  useEffect(() => {
    getData();
    getGroups();
  }, []);

  const getData = async () => {
    let { data } = await get_data("preferences/reports", 1);

    if (data) {
      setData(data);
      setsettingsToCompare(data);
    }
  };

  const getGroups = async () => {
    let { data } = await get_data("groups");
    let arrayGroups = data.filter((group) => group.id !== 1);
    let array = arrayGroups.map(({ id, name }) => {
      return { name: name, id: id };
    });
    setGroups(array);
  };

  async function saveData(e) {
    let date = new Date().toISOString();
    let comparation = compareObj(data, settingsToCompare);
    if (comparation) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "¡No hay cambios para guardar!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (data.reportsDays === true && group === null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe seleccionar un grupo para el envio de los reportes!",
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (
      data.reportsDays === true &&
      (data.emailUser === "" ||
        data.emailUser === null ||
        data.emailKey === "" ||
        data.emailKey === null)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "No puede activar reportes sin tener un email y una clave SMTP configurados!",
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (
      data.reportsDays === true &&
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        data.emailUser
      ) === false
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email con formato invalido!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (
      data.reportsDays === true &&
      /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/i.test(data.emailUser) === false
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email debe ser dominio Gmail!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      setData({
        ...data,
        date: date,
      });

      let response = await put_data("preferences/reports", data);
      if (response.data.result) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cambios guardados exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (response.status === 400 && response.data.result === false) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Debe seleccionar un grupo con usuarios!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al guardar cambios!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setGroup(null);
    }

    setsettingsToCompare(data);
  }

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setData({
        ...data,
        [e.target.id]: $(`#${e.target.id}`).is(":checked"),
      });
    } else {
      setData({
        ...data,
        [e.target.name]:
          e.target.type === "number"
            ? parseInt(e.target.value)
            : e.target.value === ""
            ? null
            : e.target.value,
      });
    }
  };

  const onchangeGroup = (e) => {
    setGroup(e.value);
    setData({
      ...data,
      groupId: e.value.id,
    });
  };

  if (Object.keys(data).length === 0) {
    return (
      <div className="content-wrapper containerHeight">
        <Loading color="primary" />
      </div>
    );
  } else {
    return (
      <div className="containerHeight content-wrapper">
        <Header title="Reportes y Alerta de Sobrecarga" margin="0" />
        <div className={styles.componentBox}>
          <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
            <label
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Activar Alerta de Sobrecarga
            </label>
            <label
              className={`${styles.switch} ${stylesPreferences.switchPref}`}
            >
              <input
                value={data.overAlert}
                checked={data.overAlert}
                id="overAlert"
                name="overAlert"
                type="checkbox"
                onChange={handleOnChange}
                className={`${styles.focus} ${stylesPreferences.inputsPref}`}
              />
              <span
                className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
              />
            </label>
          </div>
        </div>
        <div
          style={{
            display: data.overAlert === true ? "block" : "none",
          }}
        >
          <div
            className={`${styles.componentBox} ${stylesPreferences.boxSliderPref}`}
          >
            <div className={stylesPreferences.alignSlider}>
              <span
                className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
              >
                Ram:
              </span>
              <div className={stylesPreferences.sliderPref}>
                <Slider
                  id="ram"
                  value={data.percentRam}
                  className={stylesPreferences.slider}
                  name="percentRam"
                  onChange={(e) =>
                    setData({
                      ...data,
                      percentRam: e.value,
                    })
                  }
                />
                <h5 className={stylesPreferences.sliderPercentage}>
                  {data.percentRam}
                </h5>
              </div>
            </div>
          </div>
          <div
            className={`${styles.componentBox} ${stylesPreferences.boxSliderPref}`}
          >
            <div className={stylesPreferences.alignSlider}>
              <span
                className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
              >
                Disco:
              </span>
              <div className={stylesPreferences.sliderPref}>
                <Slider
                  id="disk"
                  value={data.percentDisk}
                  name="percentDisk"
                  className={stylesPreferences.slider}
                  onChange={(e) =>
                    setData({
                      ...data,
                      percentDisk: e.value,
                    })
                  }
                />
                <h5 className={stylesPreferences.sliderPercentage}>
                  {data.percentDisk}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.componentBox}>
          <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
            <label
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Activar Reportes
            </label>
            <label
              className={`${styles.switch} ${stylesPreferences.switchPref}`}
            >
              <input
                value={data.reportsDays}
                checked={data.reportsDays}
                id="reportsDays"
                name="reportsDays"
                type="checkbox"
                onChange={handleOnChange}
                className={`${styles.focus} ${stylesPreferences.inputsPref}`}
              />
              <span
                className={`${styles.slider} ${styles.round} ${styles.inputsLabels}`}
              />
            </label>
          </div>
        </div>
        <div
          className={styles.componentBox}
          style={{
            display: data.reportsDays === true ? "block" : "none",
          }}
        >
          <div className={`${styles.containerDiv} ${stylesPreferences.align}`}>
            <span
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Cada cuantos dias enviar reportes:
            </span>
            <input
              style={{ width: "4rem" }}
              value={data.days}
              name="days"
              onChange={handleOnChange}
              type="number"
              className={`${styles.focus} ${stylesPreferences.inputsPref}`}
            />
          </div>
        </div>
        <div
          className={`${styles.componentBox} ${stylesPreferences.boxSliderPref}`}
          style={{
            display: data.reportsDays === true ? "block" : "none",
          }}
        >
          <div className={stylesPreferences.alignSlider}>
            <span
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Enviar reportes a:
            </span>
            <Dropdown
              value={group}
              options={groups}
              emptyMessage={(props) => (
                <span>No existen grupos registrados</span>
              )}
              optionLabel="name"
              onChange={onchangeGroup}
              placeholder={
                group && group !== null ? group : "Seleccione un grupo"
              }
              className={stylesPreferences.dropdownPref}
            />
          </div>
        </div>
        <div
          className={`${styles.componentBox} ${stylesPreferences.boxInputLargePref}`}
          style={{
            display: data.reportsDays === true ? "block" : "none",
          }}
        >
          <div
            className={`${styles.containerDiv} ${stylesPreferences.alignInputLarge}`}
          >
            <label
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Email de envio de mensajes:
            </label>
            <input
              value={data.emailUser}
              name="emailUser"
              onChange={handleOnChange}
              type="text"
              className={`${styles.focus} ${stylesPreferences.inputLarge}`}
            />
          </div>
        </div>
        <div
          className={`${styles.componentBox} ${stylesPreferences.boxInputLargePref}`}
          style={{
            display: data.reportsDays === true ? "block" : "none",
          }}
        >
          <div
            className={`${styles.containerDiv} ${stylesPreferences.alignInputLarge}`}
          >
            <label
              className={`${styles.sliderLabel} ${stylesPreferences.labelPref}`}
            >
              Clave SMTP
            </label>
            <input
              value={data.emailKey}
              name="emailKey"
              onChange={handleOnChange}
              type="text"
              className={`${styles.focus} ${stylesPreferences.inputLarge}`}
            />
          </div>
        </div>
        <div className={`end-footer-body ${stylesPreferences.btnEnd}`}>
          <Button onClick={() => saveData()} variant="dark">
            <i className="fas fa-save" style={{ marginRight: "0.5rem" }}></i>
            Guardar
          </Button>
        </div>
      </div>
    );
  }
}
