import React, { Component } from 'react'
import Question from './Question.js'
import { connect } from 'react-redux'

const style = {
  fontSize: 50
}

class App extends Component {
  constructor(props) {
    super(props)
    this.interval = setInterval(() => {
      props.dispatch({
        type: 'CREATE_QUESTION',
        seed: Math.random()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <Question style={style}/>
  }

}

export default connect()(App)
