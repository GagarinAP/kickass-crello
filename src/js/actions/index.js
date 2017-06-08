import axios from "axios"
import {ACTION_TYPES} from "./../const/index"
import store from "./../store/index"

export function getTodos() {
    return axios.get("/api/todos")
        .then(response => {
            return store.dispatch(_getTodos(response.data));
        })
        .catch((error) => {
            return (error);
        });
}

export function _getTodos (data) {
    return {
        type: ACTION_TYPES.LOAD_TODOS,
        todos: data
    };
}