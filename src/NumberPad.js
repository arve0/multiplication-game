import React, { Component } from 'react'
import { connect } from 'react-redux'
import './NumberPad.less'
import { numberClicked, backspace, deleteAnswer } from './actions.js'
import keymaster from 'keymaster'

/**
 * avoid 300ms debounce on touch devices
 */
import fastclick from 'fastclick'
fastclick.attach(document.body)

class NumberPad extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['⇦', 0, '☒']
    ]
    this.state.buttonSize = 40
    this.setButtonSize = this.setButtonSize.bind(this)
  }
  setButtonSize () {
    let s = Math.floor((window.innerHeight - 40) / 7)
    this.setState({buttonSize: s})
  }
  componentDidMount () {
    this.setButtonSize()
    window.addEventListener('resize', this.setButtonSize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.setButtonSize)
  }
  render () {
    return <div className='NumberPad'>
      {this.state.numbers.map((nums, i) =>
        <Row key={i} nums={nums} buttonSize={this.state.buttonSize} />)}
    </div>
  }
}

class Row extends Component {
  render () {
    return <div className='NumberPad-row'>
      {this.props.nums.map(num =>
        <Num key={num} num={num} buttonSize={this.props.buttonSize} />)}
    </div>
  }
}
Row.propTypes = {
  nums: React.PropTypes.array.isRequired
}

class UnconnectedNum extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.clicked = false
    this.handleClick = this.handleClick.bind(this)
    if (this.props.num === '⇦') {
      this.state.key = 'backspace'
    } else if (this.props.num === '☒') {
      this.state.key = 'x'
    } else {
      this.state.key = props.num.toString()
    }
  }
  componentWillMount () {
    keymaster(this.state.key, () => {
      this.handleClick()
    })
  }
  componentWillUnmount () {
    keymaster.unbind(this.state.key)
  }
  handleClick () {
    this.setState({clicked: true})
    setTimeout(() => {
      this.setState({clicked: false})
    }, 510)
    if (this.state.key === 'backspace') {
      this.props.dispatch(backspace())
    } else if (this.state.key === 'x') {
      console.log('jej')
      this.props.dispatch(deleteAnswer())
    } else {
      this.props.dispatch(numberClicked(this.props.num))
    }
  }
  render () {
    const clicked = this.state.clicked
    const size = this.props.buttonSize

    return <button
      style={{width: size, height: size, fontSize: size / 3}}
      onClick={this.handleClick}
      className={clicked ? 'NumberPad-num--clicked' : ''}>
        {this.props.num}
    </button>
  }
}
UnconnectedNum.propTypes = {
  num: React.PropTypes.any.isRequired,
  dispatch: React.PropTypes.func.isRequired
}
const Num = connect()(UnconnectedNum)

export default NumberPad
