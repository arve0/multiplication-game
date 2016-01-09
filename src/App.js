import React, { Component } from 'react'
import Question from './Question.js'
import Answer from './Answer.js'
import Score from './Score.js'
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
  constructor (props) {
    super(props)

    // predictable random numbers
    props.dispatch({
      type: 'SEED_QUESTION',
      seed: 'evra'
    })
    props.dispatch({ type: 'CREATE_QUESTION' })
  }

  render () {
    return (
      <div className='App' style={style}>
        <Question/>
        <Answer/>
        <Score/>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

export default connect()(App)
