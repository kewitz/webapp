import React, { PropTypes, PureComponent } from 'react'
import classNames from 'classnames'
import { ChevronCircleIcon } from '../assets/Icons'
import { css, hover, media } from '../../styles/jss'
import {
  alignTop,
  colorA,
  colorBlack,
  fontSize18,
  fontSize24,
  minBreak2,
  minBreak3,
  nowrap,
  pl0,
  relative,
  transitionColor,
} from '../../styles/jso'

const buttonStyle = css(
  relative,
  { height: 40 },
  { paddingLeft: 30 },
  fontSize18,
  colorBlack,
  nowrap,
  alignTop,
  transitionColor,
  hover(colorA),
  media(minBreak2, fontSize24),
  media(minBreak3, pl0),
)

export default class TreeButton extends PureComponent {

  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    isCollapsed: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    isCollapsed: true,
    onClick: null,
  }

  componentWillMount() {
    const { isCollapsed } = this.props
    this.state = {
      collapsed: isCollapsed,
    }
  }

  onClickTreeButton = (...rest) => {
    const { onClick } = this.props
    const { collapsed } = this.state
    const newCollapsedState = !collapsed
    this.setState({ collapsed: newCollapsedState })
    if (typeof onClick === 'function') {
      onClick(...rest)
    }
  }

  render() {
    const { children, className } = this.props
    const { collapsed } = this.state
    return (
      <button
        className={classNames('TreeButton', className, `${buttonStyle}`, { isCollapsed: collapsed })}
        onClick={this.onClickTreeButton}
      >
        <ChevronCircleIcon />
        {children}
      </button>
    )
  }
}

