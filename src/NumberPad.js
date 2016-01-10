import React, { Component } from 'react'
import { connect } from 'react-redux'
import './NumberPad.less'
import { numberClicked, backspace } from './actions.js'
import keymaster from 'keymaster'

class NumberPad extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [0, '⇦']
    ]
  }
  render () {
    return <div className='NumberPad'>
      {this.state.numbers.map((nums, i) => <Row key={i} nums={nums} />)}
    </div>
  }
}

class Row extends Component {
  render () {
    return <div className='NumberPad-row'>
      {this.props.nums.map(num => <Num key={num} num={num} />)}
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
    } else {
      this.props.dispatch(numberClicked(this.props.num))
    }
  }
  render () {
    const clicked = this.state.clicked

    return <span
      onClick={this.handleClick}
      className={clicked ? 'NumberPad-num--clicked' : ''}>
        {this.props.num}
    </span>
  }
}
UnconnectedNum.propTypes = {
  num: React.PropTypes.any.isRequired,
  dispatch: React.PropTypes.func.isRequired
}
const Num = connect()(UnconnectedNum)

export default NumberPad
