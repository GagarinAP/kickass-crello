import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import createFragment from "react-addons-create-fragment"
import PropTypes from "prop-types"
import _ from "lodash"
import {withRouter} from "react-router-dom"
import Footer from "./Footer"
import Form from "./Form"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
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

        return (
            <div className="row">
                <div className="col-md-11"
                    onClick={() => this.onClickHandler(id)}
                >
                    <h2>{todo}</h2>
                </div>
                <div className="col-md-1">
                    <a onClick={() => this._removeTodo(id)}>
                        <i className="fa fa-trash-o fa-2x pull-right fafa-todo"/>
                    </a>
                </div>
            </div>
        );
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
                    <Form/>
                    <div className="col-md-8 col-md-offset-2">
                        {_.map( this.state.todos, (value, key) => {
                            return (
                                <div className="well well-todo"
                                    key={key}
                                    style={{color: value.active ? "black": "grey"}}
                                >
                                    {this.SwapperObject(value)}
                                </div>
                            )
                        })}
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    item: "",
    todo: {
        todo: "",
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
