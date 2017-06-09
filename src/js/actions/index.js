import axios from "axios"
import {ACTION_TYPES} from "./../const/index"
import store from "./../store/index"
import _ from "lodash"

export function getTodos() {
    axios.get("/api/todos")
        .then(response => {
            _getTodos(response.data);
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

export function deleteTodo(id) {
    return axios.delete(`/api/todo/${id}`)
        .then(response => {
            _deleteTodo(response.data);
        })
        .catch((error) => {
            return (error);
        });
}

export function _deleteTodo (data) {
    store.dispatch({
        type: ACTION_TYPES.DELETE_TODO,
        todo: data
    });
}