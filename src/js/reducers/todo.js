import {ACTION_TYPES} from "./../const/index"

export function todo(state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.ADD_TODO:
            return Object.assign({}, state, {todo: action.todo});
        default: return state
    }
}