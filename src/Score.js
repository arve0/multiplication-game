import React from 'react'
import { connect } from 'react-redux'
import AnimateOnChange from 'react-animate-on-change'
import './Score.less'

const Score = ({diff, points}) => {
  let diffText = `+ ${diff}`
  let diffClass = 'Score-diff'

  if (diff === 0) {
    diffClass += ' Score-diff--wrong'
  }

  return <div className='Score'>
    <AnimateOnChange baseClassName='Score-points'
      animationClassName='Score--bounce'
      animate={diff !== 0}>
        Score: {points}
    </AnimateOnChange>
    <div className={diffClass}>
        {diffText}
    </div>
  </div>
}
Score.propTypes = {
  diff: React.PropTypes.number.isRequired,
  points: React.PropTypes.number.isRequired
}

const mapStateToProps = s => ({
  diff: s.score.diff,
  points: s.score.points
})

export default connect(mapStateToProps)(Score)
