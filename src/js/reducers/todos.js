import {ACTION_TYPES} from "./../const/index"
import _ from "lodash"

export function todos(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_TODOS:
            return Object.assign({}, state, {todos: action.todos});
        case ACTION_TYPES.ADD_TODO:
            const newState1 = state;
            _.filter(state, (value) => {
                if(value._id !== action.todo._id) {
                    Object.assign({}, newState1, {todo: action.todo});
                }
            });
            return newState1;
        case ACTION_TYPES.UPDATE_TODO:
            const newState2 = state;
            _.filter(state, (value) => {
                if(value._id !== action.todo._id) {
                    Object.assign({}, newState2, {todo: action.todo});
                }
            });
            return newState2;
        case ACTION_TYPES.DELETE_TODO:
            const newState3 = state;
            _.filter(newState3, (value) => {
                if(value._id !== action.todo._id) {
                    Object.assign({}, newState3);
                }
            });
            return newState3;
        default: return state
    }
}