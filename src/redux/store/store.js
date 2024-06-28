import { createStore, applyMiddleware,compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducer/reducer';

// esta línea es para conectar con la extensión del navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)) // esta línea es para poder hacer peticiones a un server
);
export default store;