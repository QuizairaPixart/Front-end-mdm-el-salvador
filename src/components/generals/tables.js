import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";

export default function Table(props) {
  
    const [info, setInfo] = useState();

  //le pegamos al backend para traer datos

  useEffect(()=>{
    setInfo(props.data);
    createColumns(props.columns);
  },[])

  //3 - Configuramos las columns para Datatable
  const columns = [
    {
      name: "id",
      selector: row => row.id
    },
    {
      name: "id_device", 
      selector: row => row.id_device
    }
  ];

  function createColumns(object){
    object.forEach((element) => {
      let hola = row => row;
      let chau = hola + "." + element;
      let column = new Object();

      column.name = element;
      column.selector = chau;
      columns.push(column);
    });
    console.log(columns);
  }

  //{
   // name: 'Identity',
  //  selector: row => row.id_device
  //}

  //personalizar temas
 /*  createTheme('custom', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark'); */
  
 // const MyComponent = () => (
   // <DataTable
    //  title="Arnold Movies"
    //  columns={columns}
    //  theme="solarized"
    ///>
  //);


    return (
        <div className="App">
          <h2>Equipos</h2>
         <DataTable 
            columns={columns}
            data={info}
            pagination
         />
        </div>
      );
}
