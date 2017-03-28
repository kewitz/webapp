import React, { PropTypes, PureComponent } from 'react'
import classNames from 'classnames'
import { css, hover } from '../../styles/jss'
import {
  borderBottom,
  color9,
  colorBlack,
  fontSize14,
  py10,
  transitionColor,
} from '../../styles/jso'

const buttonStyle = css(py10, fontSize14, color9, transitionColor, hover(colorBlack))
const labelStyle = css({ marginLeft: 5 }, borderBottom)

export default class ContentWarningButton extends PureComponent {

  static propTypes = {
    contentWarning: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.state = {
      isOpen: false,
    }
  }

  onClickToggle = () => {
    const { isOpen } = this.state
    const newIsOpen = !isOpen
    this.setState({ isOpen: newIsOpen })
  }

  render() {
    const { contentWarning } = this.props
    const { isOpen } = this.state
    const classes = classNames('ContentWarningButton', { isOpen }, `${buttonStyle}`)
    return (
      <button className={classes} onClick={this.onClickToggle}>
        <span>
          {contentWarning}
        </span>
        <span className={labelStyle}>
          {isOpen ? 'Hide' : 'View'}
        </span>
      </button>
    )
  }
}

