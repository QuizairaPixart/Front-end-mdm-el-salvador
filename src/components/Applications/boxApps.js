import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import "../../css/applications/box.css";

export default function BoxApps(props) {
    //Apps seleccionadas en el Box 
    const [selecteds, setSelecteds] = useState([]);

    //Apps sin categoria
    const [source, setSource] = useState(null);

    //Apps con la categoria seleccionada
    const [target, setTarget] = useState([]);

    function getApps(data){
        let appsSource;
        let appsTarget;

        if(props.category.id === 0){
            appsSource = data?.filter((app) => app.groupApp !== 0);
        } else if(props.category.id === 1){
            appsSource = data?.filter((app) => app.system === true);
        } else {
            appsSource = data?.filter((app) => app.groupApp == null);
        }

        appsTarget = data?.filter((app) => app.groupApp === props.category.id);
        setSource(appsSource);
        setTarget(appsTarget);
    };

    useEffect(() => {
        getApps(props.data);
    }, [props.data, props.category]);

    const onChange = (event) => {
        let source = event.source.sort((a,b)=>a.id-b.id);
        let target = event.target.sort((a,b)=>a.id-b.id);
        setSource(source);
        setTarget(target);
    };

    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                <p>{data.app}</p>
            </div>
        );
    };

    const onMoveTarget = () => {
        let putApps = selecteds.map((app) => {
            app.groupApp = props.category.id;
            return app;
        });
        props.update(putApps[0]);
    };

    const onMoveSource = () => {
        let putApps = selecteds.map((app) => {
            app.groupApp = null;
            return app;
        });
        props.update(putApps[0]);
    };

    const onchangeSource = (data) => {
        setSelecteds(data.value);
    };

    if(source !== null){
        return (
            <div className="picklist-demo">
                <PickList
                    source={source}
                    target={target}
                    itemTemplate={itemTemplate}
                    onMoveToTarget={onMoveTarget}
                    onMoveToSource={onMoveSource}
                    onSourceSelectionChange={onchangeSource}
                    onTargetSelectionChange={onchangeSource}
                    sourceHeader="Disponibles"
                    targetHeader={props.category.name}
                    sourceStyle={{ height: "342px" }}
                    targetStyle={{ height: "342px" }}
                    onChange={onChange}
                    filterBy="app"
                    sourceFilterPlaceholder="Buscar"
                    targetFilterPlaceholder="Buscar"
                    className="boxApp"
                />
            </div>
        );
    }
}
