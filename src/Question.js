import React from 'react'
import { connect } from 'react-redux'

const style = {
  fontSize: 100
}

const Question = (props) =>
  <div className="Question" style={style}>
    <div className="text">{props.question}</div>
  </div>


export default connect(state => state.question)(Question)
