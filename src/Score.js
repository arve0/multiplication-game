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
    const points = this.props.points
    let className = 'Score'

    // remove animation class
    if (points != 0 && this.state.points != points) {
      className += ' Score--bounce'
      setTimeout(() => this.setState({points: points}), 820)
    }

    return <div className={className}>
      Score: {points}
    </div>
  }
}


export default connect(state => state.score)(Score)
