import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from "./store/index"

import App from "./components/App"

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/active" component={App}/>
                    <Route path="/completed" component={App}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);