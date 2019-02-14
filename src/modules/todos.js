import {Map, List} from 'immutable';
import {handleActions, createAction} from 'redux-actions';

const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove  = createAction(REMOVE);

const initialState = List([
    Map({
        id:0,
        text:'리액트 공부하기',
        done:true
    }),
    Map({
        id:1,
        text:'컴포넌트 스타일링 해보기',
        done: false
    })
]);

//리듀서 생성 --handleActions
export default handleActions({
    [INSERT ] : (state, action)=>{
        //payload 내의 id, text, done의 레퍼런스를 만들어 준다.
        //나중에 이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록
        const {id, text, done } = action.payload;

        return state.push(Map({
            id,
            text,
            done
        }));
    },
    [TOGGLE] : (state, action)=>{
        //const id = action.payload; 와 동일
        //레퍼런스 생성
        const {payload: id} = action;

        //전달받은 id로 index조회
        const index = state.findIndex(todo => todo.get('id')===id);

        //updateIn으로 현재값 참조하여 반대값으로 설정
        return state.updateIn([index, 'done'], done=>!done);
        //or
        //return state.setIn([index, 'done'], !state.getIn([0, index]));
    },
    [REMOVE]: (state, action) => {
        const {payload: id } = action;
        const index = state.findIndex(todo => todo.get('id')===id);
        return state.delete(index);
    }

}, initialState);