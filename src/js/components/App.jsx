import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import _ from "lodash"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: '',
            todos: []
        };
        this._valueFormTodo = this._valueFormTodo.bind(this);
        this._addTodo = this._addTodo.bind(this);
    }

    componentDidMount() {
        Action.getTodos();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.todos !== nextProps.todos) {
            this.setState({
                todos: nextProps.todos
            });
        }
    }

    _valueFormTodo(event) {
        this.setState({
            todo: event.target.value
        });
    }

    _addTodo(event) {
        event.preventDefault();
        const newTodos = this.state.todos;
        newTodos.push(this.state.todo);
        Action.addTodo(this.state.todo);
        this.setState({
            todos: newTodos,
            todo: ''
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1 className="text-center">Todos</h1>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        <form onSubmit={this._addTodo}>
                            <div className="input-group">
                                <input className="form-control input-lg input-todo"
                                       value={this.state.todo}
                                       onChange={this._valueFormTodo}
                                       type="text"
                                       placeholder="What needs to be done?"
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-default btn-lg button-todo"
                                        type="submit"
                                        disabled={!this.state.todo}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        {_.map( this.state.todos, (value, key) => {
                            return <div className="well well-todo" key={key}>{value}</div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos,
    todo: state.todo.todo
});

export default connect(mapStateToProps)(App);
