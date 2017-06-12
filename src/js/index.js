import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import store from "./store/index"

import App from "./components/App"
import Active from "./components/Active"
import Completed from "./components/Completed"

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route component={App}
                        exact
                        path="/"
                    />
                    <Route component={Active}
                        path="/active"
                    />
                    <Route component={Completed}
                        path="/completed"
                    />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);