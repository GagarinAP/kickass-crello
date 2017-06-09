import {ACTION_TYPES} from "./../const/index"
import _ from "lodash"

export function todos(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_TODOS:
            return Object.assign({}, state, {todos: action.todos});
        case ACTION_TYPES.ADD_TODO:
            const newState = state;
            _.filter(state, (value) => {
                if(value._id !== action.todo._id) {
                    Object.assign({}, newState, {todo: action.todo});
                }
            });
            return newState;
        case ACTION_TYPES.DELETE_TODO:
            const newStat = state;
            _.filter(newStat, (value) => {
                if(value._id !== action.todo._id) {
                    Object.assign({}, newStat);
                }
            });
            return newStat;
        default: return state
    }
}