import Button from "../../generals/button";
import DataTableDemo from "../../generals/datatables/datatable";
import styles from "../../../css/Dashboards/BtnAndTable.module.css";
import store from "../../../reducer/store";
import DataTableLazy from "../../../components/generals/datatables/dataTableLazy";

export default function ButtonsAndTables(props) {
    let { user } = store.getState();

    return (
        <div>
            <div
                className={styles.contenButtons}
                style={{
                    display: user.range === 1 ? "flex" : "none",
                }}
            >
                <Button
                    title="Agregar"
                    class="btn btn-primary"
                    icon={<i class="fa-solid fa-plus"></i>}
                    click={props.add}
                />
                <Button
                    title="Eliminar"
                    class={`btn btn-danger ${props.tableData && props.tableData.length === 0 ? "disabled": ""}`}
                    icon={<i class="fas fa-trash"></i>}
                    click={props.delete}
                />
            </div>
            <div className={styles.dataTable} style={{ marginBottom: "1rem" }}>
            {props.type === "dataTableDemo" ? (
                <DataTableDemo
                    data={props.tableData}
                    table={props.table}
                    actionDashboard={props.actionDashboard}
                    actionDelete={props.actionDelete}
                    searchs={props.search}
                    rowStates={props.rowStates}
                    editUsers={props.editUsers}
                    onSelecteds={props.onSelecteds}
                    title={props.title}
                    columns={props.columns}
                />
            ): (
                <DataTableLazy 
                    table={props.table}
                    onSelecteds={props.onSelecteds}
                    devicesGroup={props.tableData}
                />
            )}
                

                
            </div>
        </div>
    );
}
