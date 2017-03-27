import React, { PropTypes, PureComponent } from 'react'
import classNames from 'classnames'
import { getSelectionContainerElement } from '../editor/SelectionUtil'
import { css, hover, modifier, select } from '../../styles/jss'
import {
  bgc4,
  block,
  borderTop,
  colorWhite,
  ellipsis,
  leftAlign,
  ml10,
  nowrap,
  overflowHidden,
  p10,
  transitionBgColor,
  w100,
} from '../../styles/jso'

const buttonStyle = css(
  block,
  w100,
  p10,
  overflowHidden,
  colorWhite,
  leftAlign,
  ellipsis,
  nowrap,
  { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
  transitionBgColor,
  select('& + &', borderTop),
  hover(bgc4),
  modifier('.isActive', bgc4),
)

const labelStyle = css(ml10)

export default class Completion extends PureComponent {

  static propTypes = {
    asset: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  onClickCompletion = (e) => {
    const { onClick } = this.props
    const node = getSelectionContainerElement()
    onClick({ value: this.getValue(), e })
    if (node) { node.focus() }
  }

  getValue() {
    return this.props.label
  }

  render() {
    const { asset, label, className } = this.props
    return (
      <button
        className={classNames('Completion', className, `${buttonStyle}`)}
        onClick={this.onClickCompletion}
      >
        {asset}
        <span className={labelStyle}>{label}</span>
      </button>
    )
  }
}

