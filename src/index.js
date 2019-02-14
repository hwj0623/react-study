import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './components/App';
import * as registerServiceWorker from './serviceWorker';


/**
 * 14.4.3 스토어 생성 및 설정, Provider로 리액트 프로젝트에 store 연동(props로 전달)
 */
import modules from './modules';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(modules, window.devToolsExtension &&  window.devToolsExtension ());


ReactDOM.render(
    <Provider store = {store}>
    <App />
    </Provider>, document.getElementById('root'));


registerServiceWorker.unregister();
