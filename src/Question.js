import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion, wrongAnswer, correctAnswer } from './actions.js'

const style = {
  fontSize: 100
}

class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.answer = this.answer.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.answer === '' ||
        nextProps.answer === this.props.answer) {
      // do nothing on empty answer or not changed
      return
    }
    if (nextProps.answer === this.props.question.answer) {
      // correct answer
      const inc = this.props.subsequentCorrect * 10
      this.answer(correctAnswer(inc))
    } else {
      // wrong answer
      clearTimeout(this.wrongTimeout)  // debounce
      // submit in 1 second if no change
      this.wrongTimeout = setTimeout(() => {
        this.answer(wrongAnswer())
      }, 1000)
    }
  }
  answer (correct) {
    clearTimeout(this.wrongTimeout)
    const dispatch = this.props.dispatch
    dispatch(correct)
    setTimeout(() => dispatch(createQuestion()), 500)
  }
  render () {
    const question = this.props.question.question + ' = ' + this.props.answer
    return <div className='Question' style={style}>
      <div className='text'>{question}</div>
    </div>
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  answer: React.PropTypes.string.isRequired,
  subsequentCorrect: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

const mapStoreToProps = (state) => {
  return {
    question: state.question,
    answer: state.answer,
    subsequentCorrect: state.score.subsequentCorrect
  }
}

export default connect(mapStoreToProps)(Question)
