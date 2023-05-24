import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import "../../css/applications/box.css";

export default function BoxApps(props) {
    //Apps sin categoria
    const [selecteds, setSelecteds] = useState([]);
    const [source, setSource] = useState(
        props.data.filter((app) => app.groupApp == null)
    );

    //Apps con la categoria seleccionada
    const [target, setTarget] = useState([]);

    //Apps por actualizar
    const [appsToPut, setAppsToPut] = useState([]);

    useEffect(() => {
        setTarget(props.data.filter((app) => app.groupApp === props.category.id));
    }, [props.category]);

    useEffect(() => {
        setSource(props.data.filter((app) => app.groupApp == null));
    }, [props.data]);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                <p>{data.app}</p>
            </div>
        );
    };

    const onMoveTarget = () => {
        const putApps = selecteds.map((app) => {
            app.groupApp = props.category.id;
            return app;
        });
        checkAppUpdate(putApps[0]);
        props.update(putApps[0]);
    };

    const onMoveSource = () => {
        const putApps = selecteds.map((app) => {
            app.groupApp = null;
            return app;
        })
        checkAppUpdate(putApps[0]);
        props.update(putApps[0]);
    };

    const checkAppUpdate = (app) => {
        if(appsToPut.length === 0){
            appsToPut.push(app);
        } else {
            let appFound = appsToPut.find((item) => item.id === app.id);
            if(appFound === undefined){
                appsToPut.push(app);
            } else {
                appsToPut.forEach((item) => item.id === appFound.id? item.groupApp = app.groupApp: null); 
            }
        }
    }

    const onchangeSource = (data) => {
        setSelecteds(data.value);
    };

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
