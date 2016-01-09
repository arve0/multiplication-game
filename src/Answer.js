import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Answer.less'

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
      this.props.dispatch({
        type: 'CORRECT_ANSWER',
        inc: inc })
      setTimeout(() => {
        this.refs.input.value = ''
        this.props.dispatch({ type: 'CREATE_QUESTION' })
      }, 200)
    } else {
      // debounce
      clearTimeout(this.wrongTimeout)
      // submit in 1 second if no change
      this.wrongTimeout = setTimeout(() => {
        this.refs.input.value = ''
        this.props.dispatch({ type: 'WRONG_ANSWER' })
        this.props.dispatch({ type: 'CREATE_QUESTION' })
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
  answer: React.PropTypes.int.isRequired,
  subsequentCorrect: React.PropTypes.int.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

const mapStoreToProps = (state) => {
  return {
    answer: state.question.answer,
    subsequentCorrect: state.score.subsequentCorrect }
}

export default connect(mapStoreToProps)(Answer)
