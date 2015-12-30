import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

const style = {
  backgroundColor: '#00f0f0',
  color: 'white',
  fontSize: 50,
  textAlign: 'center',
  marginTop: 15,
  height: 50,
  width: 80,
  padding: 5,
  borderRadius: 3,
  border: 'none',
  ':focus': {
    outline: 'none',
    backgroundColor: '#00a0a0'
  }
}


const Answer = Radium(class Answer extends Component {
  constructor(props) {
    super(props)
  }

  changeHandler(e) {
    const val = parseInt(e.target.value.trim())
    if (val === this.props.answer) {
      this.props.dispatch({ type: 'CREATE_QUESTION' })
      this.refs.input.value = ''
    }
  }

  componentDidMount() {
    this.refs.input.focus()
  }

  render() {
    return (
      <div className="Answer">
        <input
          type="text"
          ref="input"
          style={[style]}
          onChange={this.changeHandler.bind(this)} />
      </div>
    )
  }
})


export default connect(state => state.question)(Answer)
