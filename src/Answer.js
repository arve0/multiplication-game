import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Answer.less'
import { createQuestion, wrongAnswer, correctAnswer } from './actions.js'

class Answer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  changeHandler (e) {
    const val = parseInt(e.target.value.trim(), 10)

    if (val === this.props.answer) {
      const inc = this.props.subsequentCorrect * 10
      // correct
      clearTimeout(this.wrongTimeout)
      this.props.dispatch(correctAnswer(inc))
      setTimeout(() => {
        this.refs.input.value = ''
        this.props.dispatch(createQuestion())
      }, 200)
    } else {
      // debounce
      clearTimeout(this.wrongTimeout)
      // submit in 1 second if no change
      this.wrongTimeout = setTimeout(() => {
        this.refs.input.value = ''
        this.props.dispatch(wrongAnswer())
        this.props.dispatch(createQuestion())
      }, 1000)
    }
  }

  componentDidMount () {
    this.refs.input.focus()
  }

  render () {
    return <input
      className='Answer'
      type='number'
      ref='input'
      onChange={this.changeHandler.bind(this)} />
  }
}
Answer.propTypes = {
  answer: React.PropTypes.number.isRequired,
  subsequentCorrect: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

const mapStoreToProps = (state) => {
  return {
    answer: state.question.answer,
    subsequentCorrect: state.score.subsequentCorrect }
}

export default connect(mapStoreToProps)(Answer)
