import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Score.less'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    setTimeout(this.forceUpdate.bind(this), 1000)  // remove animation class
    const state = this.state
    const points = this.props.points
    let className = 'Score'
    className += (state.points == points) ? ' Score--enter' : ''
    this.state.points = points
    return <div className={className}>
      Score: {points}
    </div>
  }
}


export default connect(state => state.score)(Score)
