import React, {Component} from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {

    state={
        input: '' ,//input 값
        //일정 데이터 초깃값
        todos:[
            {id:0, text: '리액트 공부하기', done: true},
            {id:1, text: '컴포넌트 스타일링 해보기', done:false}
        ]
    }

    //3. 일정 데이터 안에 들어가는 id 값
    id = 1
    getId = () =>{
        return ++this.id; //현재값 +1을 반환
    }

    handleChange = (e) =>{
        const{value} = e.target;
        this.setState({
            input:value
        });
    }

    //새 데이터 추가
    handleInsert= () => {
        const{todos, input} = this.state;

        //새 데이터 객체 만들기
        const newTodo = {
            text:input,
            done: false,
            id: this.getId()
        }
        //배열 내에 새 데이터 삽입
        this.setState({
            todos: [...todos, newTodo],
            input:''
        })
    }



    //to do 아이템 toggle 하기
    handleToggle = (id) =>{
        // console.log("handleToggle");
        //id로 배열의 인덱스 찾음
        const{todos} = this.state;
        const index = todos.findIndex(todo=> todo.id===id);

        //찾은 데이터의 done 값을 반전
        const toggled = {
            ...todos[index],
            done: !todos[index].done
        }

        //slice를 사용해서 index 전후의 데이터를 복사
        //변경된 todo 객체를 그 사이에 넣는다
        this.setState({
            todos:[
                ...todos.slice(0, index),
            toggled,
                ...todos.slice(index+1, todos.length)
            ]
        })
    }

    //선택한 id를 배열에서 제거
    handleRemove = (id) =>{
        // console.log("handleRemove");
        const{ todos } = this.state;
        const index = todos.findIndex(todo => todo.id===id);

        this.setState({
            todos:[
                ...todos.slice(0, index),
                ...todos.slice(index+1, todos.length)
            ]
        })
    }

    render(){
        const{input, todos} = this.state;
        const{
            handleChange,
            handleInsert,
            handleToggle,
            handleRemove
        } = this;
        return (
    <div>
                <PageTemplate>
                    <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
                    <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                </PageTemplate>
    </div>
        );
    }
}

export default App;