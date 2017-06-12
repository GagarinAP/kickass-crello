import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
        this._valueFormTodo = this._valueFormTodo.bind(this);
        this._addTodo = this._addTodo.bind(this);
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
                todo: ""
            }
        });
        Action.getTodos();
    }

    render() {
        return(
            <div className="col-md-8 col-md-offset-2">
                <form onSubmit={this._addTodo}>
                    <div className="input-group">
                        <input className="form-control input-lg input-todo"
                            name="todo"
                            onChange={this._valueFormTodo}
                            placeholder="What needs to be done?"
                            type="text"
                        />
                        <div className="input-group-btn">
                            <button className="btn btn-default btn-lg button-todo"
                                disabled={!this.state.todo.todo}
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Form.defaultProps = {
    item: "",
    todo: {
        todo: "",
        active: true
    },
    todos: [],
    active: true
};

Form.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Form));
