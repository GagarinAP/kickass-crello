import {ACTION_TYPES} from "./../const/index"

export function todos(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_TODOS:
            return Object.assign({}, state, {todos: action.todos});
        default: return state
    }
}