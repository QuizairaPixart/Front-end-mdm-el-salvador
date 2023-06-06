import Swal from "sweetalert2";
import { get_data } from "../../../actions/index";
import { formatDate } from "../../../components/generals/charts/utils/DatesFormats";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = async (date) => {
  let exportColumns = [
    {
      dataKey: "name",
      header: "Nombre",
    },
    {
      dataKey: "identity",
      header: "Identificador",
    },
    {
      dataKey: "mac",
      header: "Mac Address",
    },
    {
      dataKey: "IMEI",
      header: "IMEI",
    },
    {
      dataKey: "connection",
      header: "Última Conexión",
    },
  ];

  let json = {
    like: null,
    include: date + " 00:00:00.000 +00:00",
    reports: true,
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Descargar tabla en formato PDF?",
      icon: "warning",
      text: "Puede tardar el proceso de descarga",
      showCancelButton: true,
      confirmButtonText: "Si, descargar",
      cancelButtonText: "No, cerrar",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval;

        Swal.fire({
          title: "¡Alerta de descarga de archivo!",
          html: "",
          timer: 30000,
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(500);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        let data;

        if (date !== undefined) {
          const res = await get_data("reports", JSON.stringify(json));
          data = res.data;
        } else {
          const res = await get_data("devices", null);
          data = res.data;
        }

        if (data.length !== 0) {
          data.map((info) => {
            info.connection = formatDate(info.connection.date);
          });
        }

        const doc = new jsPDF(0, 0);
        autoTable(doc, {
          columns: exportColumns,
          body: data,
        });
        doc.save("table-devices.pdf");
      }
    });
};

export const exportCSV = async (columns, date) => {
  let json = {
    like: null,
    include: date + " 00:00:00.000 +00:00",
    reports: true,
  };

  function convertToCsv(data, columns, columnsHeader, separador = ",") {
    return [
      columnsHeader.join(separador),
      ...data.map((info) =>
        columns.reduce(
          (a, p) =>
            `${a}${!a.length ? "" : separador}${info[p] ? info[p] : ""}`,
          ""
        )
      ),
    ].join("\n");
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
      title: "Descargar tabla en formato CSV?",
      icon: "warning",
      text: "Puede tardar el proceso de descarga",
      showCancelButton: true,
      confirmButtonText: "Si, descargar",
      cancelButtonText: "No, cerrar",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: "¡Alerta de descarga de archivo!",
          html: "",
          timer: 15000,
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        let data;

        if (date !== undefined) {
          const res = await get_data("reports", JSON.stringify(json));
          data = res.data;
        } else {
          const res = await get_data("devices", null);
          data = res.data;
        }

        if (data.length !== 0) {
          data.map((info) => {
            info.connection = formatDate(info.connection.date);
            delete info.groups;
            delete info.type;
            delete info.thiefId;
            delete info.status_lock;
            delete info.statId;
            delete info.stat;
            delete info.serial_number;
            delete info.motive_lock;
            delete info.locationId;
            delete info.connectionId;
            delete info.id;
            delete info.id_device;
            delete info.so;
          });
        }

        let csvContent = convertToCsv(
          data,
          ["name", "mac", "IMEI", "identity", "connection"],
          ["Nombre", "Mac_Address", "IMEI", "Identificador", "Ultima_Conexion"]
        );
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "table-devices.csv");
        a.click();
      }
    });
};
