import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import createFragment from "react-addons-create-fragment"
import _ from "lodash"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            todo: {},
            todos: []
        };
        this._valueFormTodo = this._valueFormTodo.bind(this);
        this._addTodo = this._addTodo.bind(this);
        this._removeTodo = this._removeTodo.bind(this);
        this.SwapperObject = this.SwapperObject.bind(this);
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
            item: event.target.value
        });
    }

    _addTodo(event) {
        event.preventDefault();
        const newTodos = this.state.todos;
        newTodos.push(this.state.todo);
        Action.addTodo(this.state.item);
        this.setState({
            todos: newTodos,
            todo: ''
        });
        Action.getTodos();
    }

    _removeTodo(id) {
        Action.deleteTodo(id);
        Action.getTodos();
    }

    SwapperObject(data) {
        let todo = createFragment({ todo: data.todo });
        let id = createFragment({ id: data._id });
        return <div>
            {todo}
            <a onClick={() => this._removeTodo(id)}>
                <i className="fa fa-trash-o pull-right"/>
            </a>
        </div>;
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
                                       value={this.state.item}
                                       onChange={this._valueFormTodo}
                                       type="text"
                                       placeholder="What needs to be done?"
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-default btn-lg button-todo"
                                        type="submit"
                                        disabled={!this.state.item}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        {_.map( this.state.todos, (value, key) => {
                            return <div className="well well-todo"
                                        key={key}>
                                {this.SwapperObject(value)}
                            </div>
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
