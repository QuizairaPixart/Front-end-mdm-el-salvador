import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import States from "../../../components/generals/states.js";
import store from "../../../reducer/store";
import { Button } from "primereact/button";
import ActionDashboard from "./actionDashboard";
import NavLinkButton from "./navlinkButton..js";
import ActionDelete from "./actionDelete";
import ModifyListSafe from "./modifyListSafe.js";
import Swal from "sweetalert2";
import "../../../css/generals/dataTable.css";

export default function DataTableDemo(props) {
    //console.log(props);
    let { user } = store.getState();
    const dt = useRef(null);
    const [customers, setCustomers] = useState(props.data);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        [props.searchs[0]]: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            ],
        },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setCustomers(props.data);
        setLoading(false);
        setSelectedCustomers(null);
    }, [props.data]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const selecteds = (data) => {
        setSelectedCustomers(data);
        props.onSelecteds(data, props.table);
    };

    const states = (rowData) => {
        return (
            <States
                alert={rowData.stat}
                title={
                    rowData.status_lock === null ||
                    rowData.status_lock === false
                        ? "Desbloqueado"
                        : "Bloqueado"
                }
            ></States>
        );
    };

    const editUser = (rowData) => {
        return (
            <Button
                icon="fa-solid fa-pen-to-square"
                className="p-button-rounded p-button-success btn-white"
                aria-label="Search"
                onClick={() => props.editUsers(rowData)}
            />
        );
    };

    const btn = (rowData) => {
        return (
            <Button
                className="p-button-secondary"
                onClick={() => props.actionBtn(rowData)}
            >
                {props.titleBtn}
            </Button>
        );
    };

    const navLink = (rowData) => {
        return (
            <NavLinkButton
                title={props.table === "cases" ? "Ver Imagenes" : null}
                url={`gallery/${rowData.id}`}
            />
        );
    };
    
    const dashboard = (rowData) => {
        return (
            <ActionDashboard
                type={props.table === "devices" ? "device" : "group"}
                id={rowData.id}
            ></ActionDashboard>
        );
    };

    const deleted = (rowData) => {
        return (
            <ActionDelete
                id={rowData.id}
                table={props.table}
                reload={props.reload}
            ></ActionDelete>
        );
    };

    const modifyLists = (rowData) => {
        return (
            <ModifyListSafe
                data={rowData}
                reload={props.reload}
            ></ModifyListSafe>
        );
    };

    const exportColumns = props.columns.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportPdf = () => {
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
                showCancelButton: true,
                confirmButtonText: "Si, descargar",
                cancelButtonText: "No, cerrar",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    import("jspdf").then((jsPDF) => {
                        import("jspdf-autotable").then(() => {
                            const doc = new jsPDF.default(0, 0);
                            doc.autoTable(exportColumns, customers);
                            doc.save("table.pdf");
                        });
                    });
                }
            });
    };

    const exportCSV = (selectionOnly) => {
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
                showCancelButton: true,
                confirmButtonText: "Si, descargar",
                cancelButtonText: "No, cerrar",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    dt.current.exportCSV({ selectionOnly });
                }
            });
    };

    const renderHeader = () => {
        return (
            <div
                className={
                    props.header === "column"
                        ? "headerTableColumn"
                        : "headerTable"
                }
            >
                <h3 className="m-0">{props.title}</h3>
                <div className="containerHeader">
                    <div className='buttonExtract'>
                        {props.exportCsv === false || user.range === 3 ? null : (
                            <Button
                                type="button"
                                icon="pi pi-file"
                                onClick={() => exportCSV(false)}
                                className="mr-2"
                                data-pr-tooltip="CSV"
                            />
                        )}
                        {props.exportPdf === false || user.range === 3 ? null : (
                            <Button
                                type="button"
                                icon="pi pi-file-pdf"
                                onClick={exportPdf}
                                className="p-button-success mr-2"
                                data-pr-tooltip="PDF"
                            />
                        )}
                    </div>
                    <div className="searchContainer">
                        <span className="p-input-icon-left" style={{width: "90%"}}>
                            <i className="pi pi-search search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Buscar..."
                            />
                        </span>
                    </div>
                    
                </div>
            </div>
        );
    };

    const header = renderHeader();
    
    return (
        <div className="datatable-doc-demo">
            <div id={props.type === "apps" ? "tableApps" : ""}>
                <DataTable
                    size="small"
                    ref={dt}
                    value={customers}
                    paginator
                    className="p-datatable-customers"
                    header={header}
                    rows={5}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    dataKey="id"
                    rowHover
                    selection={selectedCustomers}
                    onSelectionChange={(e) => selecteds(e.value)}
                    filters={filters}
                    filterDisplay="menu"
                    loading={loading}
                    responsiveLayout="scroll"
                    globalFilterFields={props.searchs}
                    emptyMessage="No existen datos para mostrar."
                    currentPageReportTemplate="Mostrando {last} de {totalRecords}"
                >
                    {props.rowSelecteds === false || user.range === 3 ? null : (
                        <Column
                            selectionMode="multiple"
                            selectionAriaLabel="name"
                            headerStyle={{ width: "3rem" }}
                            style={{ height: "5.5rem" }}
                            headerClassName='selectionChexbox'
                        />
                    )}

                    {props.rowStates === false ? null : (
                        <Column
                            sortable
                            header="Estado"
                            headerStyle={{
                                width: "5rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                overflow: "visible",
                                justifyContent: "center",
                            }}
                            style={{ minWidth: "10rem", height: "5.5rem" }}
                            body={states}
                        />
                    )}

                    {props.columns &&
                        props.columns.map((column) => {
                            return (
                                <Column
                                    key={column.field}
                                    field={column.field}
                                    header={column.header}
                                    headerStyle={{
                                        width: "5rem",
                                        textAlign: "center",
                                        justifyContent: "center",
                                    }}
                                    bodyStyle={{
                                        textAlign: "center",
                                        justifyContent: "center",
                                    }}
                                    sortable
                                    style={{
                                        minWidth: "10rem",
                                        height: "5.5rem",
                                    }}
                                />
                            );
                        })}

                    {props.actionDashboard === false ? null : (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={dashboard}
                        />
                    )}
                    {props.viewBtnAction === true ? (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={btn}
                        />
                    ) : null}
                    {props.navLink === true ? (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={navLink}
                        />
                    ) : null}
                    {props.editUsers === false ? null : (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={editUser}
                        />
                    )}
                    {props.modifyLists === true ? (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={modifyLists}
                        />
                    ) : null}

                    {props.actionDelete === false ||
                    (props.table !== "blackList" &&
                        props.table !== "whiteList" &&
                        props.table !== "suspect" &&
                        user.range !== 1) ? null : (
                        <Column
                            headerStyle={{
                                width: "4rem",
                                textAlign: "center",
                            }}
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            style={{ height: "5.5rem" }}
                            body={deleted}
                        />
                    )}
                </DataTable>
            </div>
        </div>
    );
}
