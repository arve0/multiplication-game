import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Answer.less'


class Answer extends Component {
  constructor(props) {
    super(props)
  }

  changeHandler(e) {
    const val = parseInt(e.target.value.trim())
    if (val === this.props.answer) {
      this.props.dispatch({ type: 'CORRECT_ANSWER' })
      this.props.dispatch({ type: 'CREATE_QUESTION' })
      this.refs.input.value = ''
    }
  }

  componentDidMount() {
    this.refs.input.focus()
  }

  render() {
    return <input
      className="Answer"
      type="number"
      ref="input"
      onChange={this.changeHandler.bind(this)} />
  }
}


export default connect(state => state.question)(Answer)
