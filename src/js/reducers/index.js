import {combineReducers} from "redux"
import {todos} from "./todos"
import {todo} from "./todo"

const rootReducer = combineReducers({
    todos,
    todo
});

export default rootReducer;