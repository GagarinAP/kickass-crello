import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"

class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        Action.getTodos();
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1 className="text-center">Todos</h1>
                        <form>
                            <div className="form-group">
                                <input className="form-control input-lg"
                                    type="text"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos
});

export default connect(mapStateToProps)(App);
