import React from 'react'
import { connect } from 'react-redux'
import './MultiplayerScore.less'

const Player = ({nickname, score}) =>
  <span className='Player'>{nickname} <small>({score})</small></span>

const Score = ({ab, nickname, score}) =>
  <div className='MultiplayerScore'>
    {ab.above
      ? <Player nickname={ab.above.nickname} score={ab.above.score}/>
      : null
    }
    <span className='MultiplayerScore-me'>{nickname} <small>({score})</small></span>
    {ab.below
      ? <Player nickname={ab.below.nickname} score={ab.below.score}/>
      : null
    }
  </div>

Score.propTypes = {
  ab: React.PropTypes.object.isRequired
}

const mapStateToProps = s => ({
  ab: s.score.aboveBelow,
  nickname: s.login.nickname,
  score: s.score.points
})

export default connect(mapStateToProps)(Score)
