import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from "./store/index"

import App from "./components/App"
import Active from "./components/Active"
import Completed from "./components/Completed"

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/active" component={Active}/>
                <Route path="/completed" component={Completed}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);