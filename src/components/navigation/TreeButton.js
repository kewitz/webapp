import React, { PropTypes, PureComponent } from 'react'
import classNames from 'classnames'
import { ChevronCircleIcon } from '../assets/Icons'
import { css, hover, media } from '../../styles/jss'
import * as s from '../../styles/jso'

const buttonStyle = css(
  s.relative,
  s.hv40,
  s.pl30,
  s.fontSize18,
  s.colorBlack,
  s.nowrap,
  s.alignTop,
  s.transitionColor,
  hover(s.colorA),
  media(s.minBreak2, s.fontSize24),
  media(s.minBreak3, s.pl0),
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

