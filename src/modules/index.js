import input from './input';
import todos from './todos';
import {combineReducers} from 'redux';

/**
 * 14.4.2.3 모듈 인덱스 파일 생성
 * combineReducers를 통해 리듀서 합쳐서 modules로 내보냄
 */

export default combineReducers({
    input,
    todos
})