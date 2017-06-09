import axios from "axios"
import {ACTION_TYPES} from "./../const/index"
import store from "./../store/index"
import _ from "lodash"

export function getTodos() {
    axios.get("/api/todos")
        .then(response => {
            let newResponse = [];
            _.map(response.data, (value) => {
                newResponse.push(value.todo);
            });
            _getTodos(newResponse);
        })
        .catch((error) => {
            return (error);
        });
}

export function _getTodos (data) {
    store.dispatch({
        type: ACTION_TYPES.LOAD_TODOS,
        todos: data
    });
}

export function addTodo(todo) {
    return axios.post("/api/todo",{ todo: todo })
        .then(response => {
            _addTodo(response.data);
        })
        .catch((error) => {
            return (error);
        });
}

export function _addTodo (data) {
    store.dispatch({
        type: ACTION_TYPES.ADD_TODO,
        todo: data
    });
}