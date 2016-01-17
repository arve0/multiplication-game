import { createStore, combineReducers } from 'redux'
import reducers from './reducers.js'

/**
 * Top-level state as redux store.
 */
const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default store
