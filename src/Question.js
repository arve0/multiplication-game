import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion, wrongAnswer, correctAnswer } from './actions.js'

class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.fontSize = 60
  }
  componentDidMount () {
    this.setFontSize()
    window.addEventListener('resize', this.setFontSize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.setFontSize)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.answer === '') {
      // do not timeout on cleared answer
      clearTimeout(this.wrongTimeout)
      return
    }
    if (nextProps.answer === this.props.answer) {
      // not changed, do nothing
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
  answer = (correct) => {
    clearTimeout(this.wrongTimeout)
    const dispatch = this.props.dispatch
    dispatch(correct)
    setTimeout(() => dispatch(createQuestion()), 500)
  };
  setFontSize = () => {
    let s = Math.floor((window.innerHeight - 40) / 7)
    this.setState({fontSize: s})
  };
  render () {
    const question = this.props.question.question
    const answer = '= ' + this.props.answer
    return <div className='Question' style={{fontSize: this.state.fontSize}}>
      <div>{question}</div>
      <div>{answer}</div>
    </div>
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  answer: React.PropTypes.string.isRequired,
  subsequentCorrect: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

const mapStoreToProps = (state) => ({
  question: state.question,
  answer: state.answer,
  subsequentCorrect: state.score.subsequentCorrect
})

export default connect(mapStoreToProps)(Question)
