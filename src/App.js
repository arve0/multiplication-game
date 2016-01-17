import React, { Component } from 'react'
import { connect } from 'react-redux'
import { seed, createQuestion } from './actions.js'
import { login, updateFirebaseOnStateChanges } from './db.js'
import Question from './Question.js'
import Score from './Score.js'
import MultiplayerScore from './MultiplayerScore.js'
import NumberPad from './NumberPad.js'
import Nickname from './Nickname.js'
import './App.less'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    // predictable random numbers
    props.dispatch(seed('evra'))
    props.dispatch(createQuestion())
  }
  componentWillMount () {
    login()
    updateFirebaseOnStateChanges()
  }
  render () {
    return (
      <div className='App'>
        {!this.props.nickname
          ? <Nickname />
          : <div className='Game'>
              <Question/>
              <NumberPad/>
              <Score/>
              <MultiplayerScore/>
            </div>}
      </div>
    )
  }
}
App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  nickname: React.PropTypes.string.isRequired
}

export default connect(s => s.login)(App)
