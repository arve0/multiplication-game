import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers.js'

/**
 * Redux top-level reducer function with routing.
 */
const reducer = combineReducers(reducers)
const store = createStore(reducer)

setInterval(()=>{
  store.dispatch({
    type: 'CREATE_QUESTION',
    seed: Math.random()
  })
}, 1000)


render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
