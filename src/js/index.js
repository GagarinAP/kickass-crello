import React from "react"
import ReactDOM from "react-dom"

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="container">
                <h1>Hello world</h1>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);