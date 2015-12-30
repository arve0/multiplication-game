import React, { Component } from 'react'
import Question from './Question.js'
import Answer from './Answer.js'
import { connect } from 'react-redux'


const style = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

class App extends Component {
  constructor(props) {
    super(props)
    props.dispatch({
      type: 'CREATE_QUESTION',
      seed: Math.random()
    })
  }

  render() {
    return (
      <div className="App" style={style}>
        <Question/>
        <Answer/>
      </div>
    )
  }

}

export default connect()(App)
