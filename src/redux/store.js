import {createStore , combineReducers , compose,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension'

import pokeReducer from './pokeDucks'
import usuarioReducer from './usuarioDucks'
import { leerUserActive } from './usuarioDucks'

const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuario: usuarioReducer,
    
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//config google chrome extension


export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    leerUserActive()(store.dispatch)
    return store;
}