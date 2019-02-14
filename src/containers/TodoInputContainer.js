/**
 * 14.4.4 컨테이너 컴포넌트 생성
 */
import React, {Component} from 'react';
import TodoInput from '../components/TodoInput';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//액션 생성 함수 한꺼번에 불러오기
import * as inputActions from '../modules/input';
import * as todosActions from '../modules/todos';

/**View 컴포넌트인 TodoInputContainer 정의
 */
/**
 * src/components/App.js에서 정의한 이벤트 핸들러 함수 등을
 - 데이터를 다루는 컨테이너 컴포넌트에서 정의 한다.
 - setState로 상태를 변경하던 것을 redux 액션 생성 함수 호출로 변경
 */

class TodoInputContainer extends Component{
    id = 1
    getId = () => {
        return ++this.id;
    }
    //Todo Typing 이벤트
    handleChange = (e) => {
        const { value } = e.target;
        const { InputActions } = this.props;
        InputActions.setInput(value);  //액션 생성 함수에 value 값으로 event.target.value를 전달하여 input의 value state를 변경한다.
    }

    //Todo 추가 이벤트
    handleInsert = () => {
        const { InputActions, TodosActions,  value  }  = this.props;
        const todo = {
            id : this.getId(),
            text: value,
            done: false

        };
        TodosActions.insert(todo);
        InputActions.setInput('');
    }

    render(){
        const { value } = this.props;
        const { handleChange, handleInsert } = this;
        return (
            <TodoInput
                onChange = {handleChange}
                onInsert = {handleInsert}
                value = {value}
            />
        )
    }
};

//mapStateToProps와 mapDispatchToProps 함수 레퍼런스를 따로 만들지 않고, 내부에 바로 정의 해보자
export default connect (
    //mapStateToProps와
    (state) => ({
        value : state.input.get('value')
    }),
    //mapDispatchToProps
    (dispatch) => ({
        /**
         * bindActionCreators (액션 생성 함수들이 들어있는 객체, dispatch) 사용 시 자동으로 다음 작업 수행
         * {
         *      actionCreator : (...params) => dispatch ( actionCreator ( ...params))
         * }
         * 일일히 dispatch 할 필요가 없다.
         *
         * 가령 다음 작업이 수행되는 것이다.
         * InputActions : {
         *      setInput : (value) => dispatch(inputActions.setInput(value))
         * }
         * 나중에 호출시 this.props.InputActions.setInput을 호출
         *
         *
         */
        InputActions : bindActionCreators(inputActions, dispatch),
        TodosActions : bindActionCreators(todosActions, dispatch)
    })
)(TodoInputContainer); //TodoInputContainers는 위에 정의된 View 컴포넌트


