import { JsonToExcel } from "react-json-to-excel";

const samplejson2 = [
    { name: "name01" , age:"20",sex:"M" },
    { name: "name02" , age:"22",sex:"F" },
    { name: "name03" , age:"20",sex:"M" }
];

export default function CreateExcel(props){
    return (
        <JsonToExcel
            title={props.title}
            data={props.data}
            fileName={props.filename}
        />
    );
}