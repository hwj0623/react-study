/**
 * redux 적용
 * 14.4.2.1 input 모듈 생성
 *
 *  Ducks 구조 적용한 리덕스 코드
 *  하나의 모듈 안에
 *  1) Action Type
 *  2) Action Create Func
 *  3) initialState obj
 *  4) Reducer
 *  를 모두 한 파일에서 모듈화 하여 관리
 *
 *  Ducks 구조 규칙
 *  1) export default 로  <리듀서> 내보내야 함
 *  2) export 로 <액션 생성함수>를 내보내야 한다.
 *  3) 액션 타입 이름은 [ npm-module-or-app/reducer/ACTION_TYPE ] 형식으로 만든다.
 *     (라이브러리나 애플리케이션을 여러 프로젝트로 분할한 것이 아니면 맨 앞은 생략 ex: counter/INCREMENT)
 *  4) 외부 리듀서에서 모듈의 액션 타입이 필요할 때는 액션 타입을 내보내도 됨
 *
 *  Ducks 구조로 만드는 리덕스 모듈 생성 흐름
 *  (1) 액션 타입 정의
 *  (2) 액션 생성 함수 만들기
 *  (3) 초기 상태 정의하기
 *  (4) 리듀서 정의하기
 */
import {Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

/***********(1) Action 타입 정의 *********
 * Action 타입 정의시 문자열 앞부분에 reducer 이름 (input/)을 적어주면
 * 서로 다른 리듀서끼리 액션 타입 이름이 중복되어도 문제를 일으키지 않는다.
 */
const SET_INPUT = 'input/SET_INPUT';

/***********(2) 액션 생성 함수 *********
 */
export const setInput = createAction(SET_INPUT);

/***********(3) 초기 상태 정의하기 *********
 *
 */
const initialState =  Map({
    value: ''
});

/***********(4) 리듀서 정의하기 **********
 * Reducer 생성
 handleActions 함수 사용
 handleActions (
        [1] 액션 type의 value(types.INCREMENT)나 파라미터가 여러개인 경우 객체 생성해서 전달,
        [2]초기 상태 정의 객체 )

 1) 액션 type 값으로 생성 후 호출
 export const setColor = createAction(types.SET_COLOR);
 setColor({index:5, color:'#fff'})

 2) 혹은 객체 생성으로 전달
 export const setColor = createAction(types.SET_COLOR, ({index, color}) => ({index, color}));


*/
export default handleActions ({
    [SET_INPUT]: (state, action) => {
        return state.set('value', action.payload)
    }
}, initialState);



