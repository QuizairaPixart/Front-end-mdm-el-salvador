import axios from "axios";
import { config } from "../config";
import store from "../reducer/store";
import { setUsers } from "../reducer/slices/User";
import { redirectIndex } from "../components/generals/redirect";
import { errorHandling } from "../components/generals/errorHandling";

//AUTENTICACION
function getCredetentials() {
    let { user } = store.getState();
    let auth = {
        headers: {
            Authorization: JSON.stringify({
                token: user.token,
                userId: user.userId,
            }),
        },
    };

    return auth;
}

//GET
export const get_data = async (ruta, id) => {
    let response;
    let resError;
    if (id !== undefined) {
        response = await axios.get(
            `${config.backend.host}:${config.backend.portHttp}/${ruta}/${id}`,
            getCredetentials()
        ).catch(( response ) => {
            resError = errorHandling(response, "get"); 
        });
    } else {
        response = await axios.get(
            `${config.backend.host}:${config.backend.portHttp}/${ruta}`, 
            getCredetentials() 
        ).catch(( response ) => {
            resError = errorHandling(response, "get");
        });
    }

    return (resError !== undefined ? resError : response);
};

//POST
export const post_data = async (table, payload) => {
    let response;
    let resError;
    let data;
    if (table === "actions") {
        data = {
            actions: payload,
        };
    } else {
        data = payload;
    }
        response = await axios.post(
            `${config.backend.host}:${config.backend.portHttp}/${table}`,
            data,
            getCredetentials()
        )
        .catch(( response ) => {
            resError = errorHandling(response, "post");
        });
    return (resError !== undefined ? resError : response);
};

//PUT
export const put_data = async (table, payload) => {
    return await axios
        .put(
            `${config.backend.host}:${config.backend.portHttp}/${table}`,
            payload,
            getCredetentials()
        )
        .catch(({ response }) => {
            if (response.data.redirect) {
                return redirectIndex();
            } else {
                return response;
            }
        });
};

//DELETE
export const delete_data = async (table, id) => {
    return await axios
        .delete(
            `${config.backend.host}:${config.backend.portHttp}/${table}/${id}`,
            getCredetentials()
        )
        .catch(({ response }) => {
            if (response.data.redirect) {
                return redirectIndex();
            }
        });
};

// ------------------ LOGIN ------------------

export const verifyUser = async (payload) => {
    let resError;
    let data = await axios.put(
        `${config.backend.host}:${config.backend.portHttp}/login`,
        payload
    ).catch(( response ) => {
        resError = errorHandling(response, "login");
    });

    if (data !== undefined) {
        if (data.data.auth) {
            sessionStorage.setItem("userId", data.data.id);
            sessionStorage.setItem("range", data.data.range);
            sessionStorage.setItem("token", data.data.token);
    
            let sesion = {
                userId: data.data.id,
                range: data.data.range,
                token: data.data.token,
            };
            store.dispatch(setUsers(sesion));
        }
    }

    return (resError !== undefined ? resError : data);
};
