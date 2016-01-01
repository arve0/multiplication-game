import React, { Component } from 'react'
import { connect } from 'react-redux'
import Animated from './Animated.js'
import './Score.less'


class Score extends Component {
  render() {
    let diffClass = 'Score-diff'
    let diffText = this.props.diff.toString()

    if (this.props.diff == 0) {
      diffClass += ' Score-diff--wrong'
    } else {
      diffText = `+ ${diffText}`
    }

    return <div className="Score">
      <Animated className="Score-points"
        animationClassName="Score--bounce"
        animate={this.props.diff != 0}>
          Score: {this.props.points}
      </Animated>
      <Animated className={diffClass}
        animationClassName="Score--fade"
        animate={(this.props.wrong + this.props.correct) != 0}>
          {diffText}
      </Animated>
    </div>
  }
}


export default connect(state => state.score)(Score)
