import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import createFragment from "react-addons-create-fragment"
import PropTypes from "prop-types"
import _ from "lodash"
import {withRouter, Link} from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
        this._valueFormTodo = this._valueFormTodo.bind(this);
        this._addTodo = this._addTodo.bind(this);
        this._removeTodo = this._removeTodo.bind(this);
        this.SwapperObject = this.SwapperObject.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this._updateTodo = this._updateTodo.bind(this);
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
        const target = event.target;
        const todo = target.name;
        this.setState({
            todo: {
                [todo]: event.target.value
            }
        });
    }

    _addTodo(event) {
        event.preventDefault();
        const newTodos = this.state.todos;
        newTodos.push(this.state.todo.todo);
        Action.addTodo(this.state.todo.todo);
        this.setState({
            todos: newTodos,
            todo: {
                todo: ''
            }
        });
        Action.getTodos();
    }

    _updateTodo(id) {
        Action.updateTodo(id, this.state.active);
        Action.getTodos();
    }

    _removeTodo(id) {
        Action.deleteTodo(id);
        Action.getTodos();
    }

    SwapperObject(data) {
        let todo = createFragment({ todo: data.todo });
        let id = createFragment({ id: data._id });

        return <div className="row">
            <div className="col-md-11" onClick={() => this.onClickHandler(id)}>
                <h2>{todo}</h2>
            </div>
            <div className="col-md-1">
                <a onClick={() => this._removeTodo(id)}>
                    <i className="fa fa-trash-o fa-2x pull-right fafa-todo"/>
                </a>
            </div>
        </div>;
    }

    onClickHandler(id) {
        this.setState({
           active: !this.state.active
        });
        this._updateTodo(id);
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
                                       name="todo"
                                       onChange={this._valueFormTodo}
                                       type="text"
                                       placeholder="What needs to be done?"
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-default btn-lg button-todo"
                                        type="submit"
                                        disabled={!this.state.todo.todo}
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
                                        key={key} style={{color: value.active ? 'black': 'grey'}}>
                                {this.SwapperObject(value)}
                            </div>
                        })}
                    </div>
                    <hr/>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="well well-todo">
                            <div className="text-center">
                                <o className="pull-left"><kbd>{this.props.todos.length}</kbd> item{this.props.todos.length > 1 ? '`s' : ''} left</o>
                                <Link to="/"><strong>All </strong></Link>
                                <Link to="/active"> Active </Link>
                                <Link to="/completed">Completed</Link>
                                <a className="pull-right" onClick={() => this._allDelete()}> Clear completed</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    item: '',
    todo: {
        todo: '',
        active: true
    },
    todos: [],
    active: true
};

App.propTypes = {
    todo: PropTypes.shape({
        active: PropTypes.bool,
        todo: PropTypes.string,
        _id: PropTypes.string
    }),
    todos: PropTypes.array
};

const mapStateToProps = (state) => ({
    todos: state.todos.todos
});

export default withRouter(connect(mapStateToProps)(App));
