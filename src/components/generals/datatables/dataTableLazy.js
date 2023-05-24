import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get_data } from "../../../actions/index";
import Loading from "../../generals/loading";
import { formatDate } from "../../generals/charts/utils/DatesFormats";
import { Dropdown } from 'primereact/dropdown';
import States from "../../generals/states";
import ActionDelete from "./actionDelete";
import store from "../../../reducer/store";
import ActionDashboard from "./actionDashboard";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Swal from "sweetalert2";
import "../../../css/generals/dataTable.css";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function DataTableLazy(props) {
    //console.log(props)
    let { user } = store.getState();
    const dt = useRef(null);
    const it = useRef(null);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [devices, setDevices] = useState(null);
    const [groupId, setGroupId] = useState(props.groupId);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(10);
    const [selectedFilter, setSelectedFilter] = useState("identity");
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filter: "identity",
        reload: false,
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    useEffect(() => {
        loadLazyData();
    }, [lazyParams]);

    useEffect(() => {
       cleanSelected () 
    }, [props.updateSelected]);

    const loadLazyData = async (props) => {
        setLoading(true);
        if(props === true){
            setLazyParams({
                ...lazyParams,
                reload: props
            });
        }

        let sortField = lazyParams.sortField;
        let sortOrder = lazyParams.sortOrder;

        if (sortField && sortField === "connection.date") {
            sortField = "connectionId";
        }

        let json = {
            like: (globalFilterValue === "" || it.current.value === "") ? null :
                (lazyParams.filter === "identity" || lazyParams.filter === undefined) ? globalFilterValue.toUpperCase() :
                    globalFilterValue,
            offset: lazyParams.first,
            limit: lazyParams.rows,
            order: (sortField === null || sortOrder === null) ? ['connectionId', 'DESC'] :
                sortOrder === 1 ? [sortField, 'ASC'] :
                    [sortField, 'DESC'],
            column: lazyParams.filter === undefined ? "identity" : lazyParams.filter,
        }

        let response = await get_data("devices", JSON.stringify(json));
        //console.log("con JSON:", response);
        
        if(response.data.error && response.data.error === true){
            setDevices([]);
            setLoading(false);
        } else {
            let data = response.data.rows;

            if(groupId !== false){
                data.forEach((device) => {
                    let answer;
                    answer = device.groups.findIndex(group => group.id === parseInt(groupId));
                    if (answer === -1){
                        device.is_selectable = true;
                    } else {
                        device.is_selectable = false;
                    }
                })
            }

            if (data && data.length === 0) {
                setDevices([]);
            } else if (data && data.length !== 0) {
                data.forEach((info) => {
                    let object = {date: "aun no disponible"};
                    if(info.connection === null){
                        info.connection = object;
                    } else {
                        info.connection.date =  formatDate(info.connection.date);
                    } 
                });
                setDevices(data);
            }
            setTotalRecords(response.data.count);
            setLoading(false);
            
            if(props){
                setLazyParams({
                    ...lazyParams,
                    reload: false
                });
            }  
        }
    }

    const isSelectable = (data) => ( data.is_selectable !== false);

    const isRowSelectable = (event) => (event.data ? isSelectable(event.data): true);

    const rowClassName = (data) => (isSelectable(data) ? '' : 'p-disabled');

    const onPage = (event) => {
        setLazyParams({
            ...lazyParams,
            page: event.page,
            first: event.first,
        });
    }

    const onSort = (event) => {
        setLazyParams({
            ...lazyParams,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        });
    }

    const onSelectionChange = (event) => {
        setSelectedDevices(event.value);
        props.onSelecteds(event.value, props.table);
    };

    function cleanSelected () {
        setSelectedDevices([]);
        props.onSelecteds([], props.table);
    };

    const onGlobalFilter = (e) => {
        loadLazyData();
    };

    const onChangeFilterInput = (e) => {
        setGlobalFilterValue(e.target.value);

        if (e.target.value === "") {
            setTimeout(() => {
                loadLazyData();
            }, 1500);
        }
    };

    const onKeyUpInputText = (e) => {
        if (e.key === "Enter") {
            loadLazyData();
        }
    };

    let columns = [
        {
            field: "name",
            header: "Nombre",
        },
        {
            field: "identity",
            header: "Identificador",
        },
        {
            field: "mac",
            header: "Mac Address",
        },
        {
            field: "IMEI",
            header: "IMEI",
        },
        {
            field: "connection.date",
            header: "Última Conexión",
        },
    ];

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

    const exportPdf = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
    
        swalWithBootstrapButtons.fire({
            title: "Descargar tabla en formato PDF?",
            icon: "warning",
            text: "Puede tardar el proceso de descarga",
            showCancelButton: true,
            confirmButtonText: "Si, descargar",
            cancelButtonText: "No, cerrar",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                let timerInterval;

                Swal.fire({
                title: '¡Alerta de descarga de archivo!',
                html: '',
                timer: 30000,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(500)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                })

                const res = await get_data("devices", null);
                let data = res.data;

                console.log("sin JSON:", res)
                
                if(data.length !== 0){
                    data.map((info) => {
                        info.connection =  formatDate(info.connection.date);
                    });
                }
                    
                const doc = new jsPDF(0, 0);
                autoTable(doc, {
                    columns: exportColumns,
                    body: data,
                })
                doc.save("table-devices.pdf");
            }   
        });
    }

    function convertToCsv (data, columns, columnsHeader, separador=','){
        return[
            columnsHeader.join(separador),
            ...data.map(info => columns.reduce((a, p) => `${a}${!a.length? '': separador}${info[p]? info[p]: ''}`, ''))
        ].join('\n');
    }

    const exportCSV = async() => {

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
                    title: '¡Alerta de descarga de archivo!',
                    html: '',
                    timer: 15000,
                    timerProgressBar: false,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                    })
                    const res = await get_data("devices", null);
                    let data = res.data;
                
                    if(data.length !== 0){
                        data.map((info) => {
                            info.connection =  formatDate(info.connection.date);
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

                    let csvContent = convertToCsv(data, ['name','mac','IMEI','identity','connection'], ['Nombre','Mac_Address','IMEI','Identificador','Ultima_Conexion']);
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'table-devices.csv');
                    a.click();
                }
            });
    };

    const onFilters = (e) => {
        setSelectedFilter(e.value);
        setLazyParams({
            ...lazyParams,
            filter: e.value
        });
    };

    const renderHeader = () => {
        const dropdownOptions = [
            { label: "Nombre", value: "name" },
            { label: "Identificador", value: "identity" },
            { label: "Mac Address", value: "mac" },
            { label: "IMEI", value: "IMEI" },
        ];

        return (
            <div className="containerHeader">
                {user.range === 3 ? null : (
                    <div className='containerButtons'>
                        <div className='buttonExtract'>
                            <Button
                                type="button"
                                icon="pi pi-file"
                                onClick={() => exportCSV()}
                                className="mr-2"
                                data-pr-tooltip="CSV"
                            />
                            <Button
                                type="button"
                                icon="pi pi-file-pdf"
                                onClick={exportPdf}
                                className="p-button-success mr-2"
                                data-pr-tooltip="PDF"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={() => cleanSelected()}
                            className="p-button-success mr-2 uncheck"
                        >
                            Limpiar selección
                        </Button>
                    </div>
                )}
                <div className="searchContainer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search search"
                            onClick={onGlobalFilter}
                        />
                        <InputText
                            value={globalFilterValue}
                            onChange={onChangeFilterInput}
                            placeholder="Buscar..."
                            ref={it}
                            onKeyUp={onKeyUpInputText}
                        />
                    </span>
                    <Dropdown
                        value={selectedFilter}
                        options={dropdownOptions}
                        onChange={onFilters}
                        optionLabel="label"
                        optionValue='value'
                        className='filterDropdown'
                    />
                </div>
            </div>
        );
    };

    let tableHeader = renderHeader();

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

    const deleted = (rowData) => {
        return (
            <ActionDelete
                id={rowData.id}
                table={props.table}
                reload={()=>loadLazyData()}
            ></ActionDelete>
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

    let rowsPerPageDropdown = () => {
        const dropdownOptions = [
            { label: "5", value: 5 },
            { label: "10", value: 10 },
            { label: "20", value: 20 }
        ];

        const onRowsPerPageChange = (e) => {
            setSelectedRowsPerPage(e.value);
            setLazyParams({
                ...lazyParams,
                rows: e.value
            });
        }

        return (
            <div className="footerDataTable">
                <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Dispositivos por página:
                </span>
                <Dropdown
                    value={selectedRowsPerPage}
                    options={dropdownOptions}
                    onChange={onRowsPerPageChange}
                    optionLabel="label"
                    optionValue='value'
                    className='rowsDropdown'
                />
                <p style={{ marginBottom: "0", fontWeight: "normal" }}>
                    { lazyParams.rows > devices.length ? 
                        (`Mostrando ${devices.length} de ${totalRecords}`) : 
                        (`Mostrando ${lazyParams.first + 1} a ${lazyParams.first + selectedRowsPerPage} de ${totalRecords}`)
                    }
                </p>
            </div>
        )
    };

    if (devices === null) {
        return (
            <div>
                <Loading color="primary" />;
            </div>
        );
    } else {
        return (
            <div className="datatable-doc-demo">
                <DataTable
                    size="large"
                    className="p-datatable-customers"
                    ref={dt}
                    value={ devices }
                    lazy
                    dataKey="id"
                    paginator
                    onPage={onPage}
                    onSort={onSort}
                    sortField={lazyParams.sortField}
                    sortOrder={lazyParams.sortOrder}
                    rows={lazyParams.rows}
                    first={lazyParams.first}
                    responsiveLayout="scroll"
                    totalRecords={totalRecords}
                    loading={loading}
                    emptyMessage="No existen datos para mostrar."
                    selection={selectedDevices}
                    onSelectionChange={onSelectionChange}
                    header={tableHeader}
                    footer={rowsPerPageDropdown}
                    isDataSelectable={isRowSelectable} 
                    rowClassName={rowClassName}
                >                                                                                                      
                    <Column
                        selectionMode="multiple"
                        headerClassName='selectionChexbox'
                    />

                    <Column
                        header="Estado"
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

                    {columns.map((column) => {
                        return (
                            <Column
                                field={column.field}
                                header={column.header}
                                sortable
                                style={{ textAlign: "center" }}
                            />
                        )
                    })}

                    {user.range !== 1 ? null : (
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

                    {user.range !== 1 ? null : (
                        <Column
                            bodyStyle={{
                                textAlign: "center",
                                overflow: "visible",
                            }}
                            body={deleted}
                        />
                    )}

                </DataTable>
            </div>
        );
    }
}