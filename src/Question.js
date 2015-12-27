import React from 'react'
import { connect } from 'react-redux'


const Question = (props) => {
  return <div className="Question" style={props.style}>
    <div className="text">{props.question}</div>
  </div>
}


export default connect(state => state.question)(Question)
