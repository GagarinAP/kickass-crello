import React from "react"
import {connect} from "react-redux"
import * as Action from "./../actions/index"
import PropTypes from "prop-types"
import {withRouter, Link} from "react-router-dom"

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
        this._allDelete = this._allDelete.bind(this);
    }

    componentDidMount() {
        Action.getTodos();
    }

    _allDelete() {
        Action.deleteAllTodos();
        Action.getTodos();
    }

    render() {
        const pri = "btn btn-primary btnr";
        const def = "btn btn-default btnr";
        return(
            <div className="col-md-8 col-md-offset-2">
                <div className="well well-todo">
                    <div className="text-center">
                        <p className="pull-left item-todo-length">
                            <kbd>{this.props.todos.length}</kbd>
                            item{this.props.todos.length > 1 ? "`s" : ""} left
                        </p>
                        <Link className={this.props.match.path === "/" ? pri : def}
                            to="/"
                        >
                            All
                        </Link>
                        <Link className={this.props.match.path === "/active" ? pri : def}
                            to="/active"
                        >
                            Active
                        </Link>
                        <Link className={this.props.match.path === "/completed" ? pri : def}
                            to="/completed"
                        >
                            Completed
                        </Link>
                        <button className="pull-right btn btn-default btnr"
                            onClick={() => this._allDelete()}
                        >
                            Clear completed
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos
});

Footer.defaultProps = {
    todos: []
};

Footer.propTypes = {
    todos: PropTypes.array,
    match: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(Footer));
