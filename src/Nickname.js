import React from 'react'
import { connect } from 'react-redux'
import { nickname } from './actions.js'
import './Nickname.less'

const Nickname = ({dispatch}) => {
  const handleSubmit = (event) => {
    event.target.nickname.blur()
    event.preventDefault()
    const name = event.target.nickname.value
    dispatch(nickname(name))
  }
  return (
    <form className='Nickname' onSubmit={handleSubmit}>
      <label htmlFor='nickname'>Nickname</label>
      <input type='text' id='nickname'/>
      <button type='submit'>Play</button>
    </form>
  )
}
Nickname.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

export default connect()(Nickname)
