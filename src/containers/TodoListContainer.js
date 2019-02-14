import React, {Component} from 'react';
import TodoList from '../components/TodoList';

import {connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import * as todosActions from '../modules/todos';


/**
 14.4.4.2 TodoList 컴포넌트를 리덕스에 연결한 TodoListContainer 생성
 */

/**View 컴포넌트인 TodoListContainer 정의
 */
class TodoListContainer extends Component{
    handleToggle = (id) => {
        const { TodosActions} = this.props;
        TodosActions.toggle(id);
    }
    handleRemove = (id) => {
        const {TodosActions }  = this.props;
        TodosActions.remove(id);
    }

    render() {
        const { todos } = this.props;
        const { handleToggle, handleRemove } = this;

        return (
            <TodoList
                todos = {todos}
                onToggle={handleToggle}
                onRemove = {handleRemove}
            />
        )
    }
}

export default connect(
    (state)=> ({
        todos: state.todos
    }),
    (dispatch) => ({
        TodosActions: bindActionCreators(todosActions, dispatch)
    })
)(TodoListContainer)

