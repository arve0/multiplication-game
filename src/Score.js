import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimateOnChange from 'react-animate-on-change'
import './Score.less'

class Score extends Component {
  render () {
    let diffText = `+ ${this.props.diff}`
    let diffClass = 'Score-diff'

    if (this.props.diff === 0) {
      diffClass += ' Score-diff--wrong'
    }

    return <div className='Score'>
      <AnimateOnChange baseClassName='Score-points'
    animationClassName='Score--bounce'
    animate={this.props.diff !== 0}>
          Score: {this.props.points}
      </AnimateOnChange>
      <AnimateOnChange baseClassName={diffClass}
    animationClassName='Score--fade'
    animate={(this.props.wrong + this.props.correct) !== 0}>
          {diffText}
      </AnimateOnChange>
    </div>
  }
}
Score.propTypes = {
  diff: React.PropTypes.int.isRequired,
  points: React.PropTypes.int.isRequired,
  correct: React.PropTypes.int.isRequired,
  wrong: React.PropTypes.int.isRequired
}

export default connect(state => state.score)(Score)
