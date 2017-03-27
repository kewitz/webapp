import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { css, parent } from '../../styles/jss'
import {
  absolute,
  bgcBlack,
  colorWhite,
  displayNone,
  hidden,
  inlineBlock,
  nowrap,
  opacity0,
  opacity1,
  pointerNone,
  visible,
} from '../../styles/jso'

const showHintStyle = css(
  visible,
  opacity1,
  {
    transitionDelay: '0.5s, 0s',
    transitionDuration: '0.4s, 0s',
  },
)

const hintStyle = css(
  displayNone,
  hidden,
  absolute,
  {
    top: -25,
    left: 0,
    height: 22,
    padding: '0 11px',
    lineHeight: '22px',
    borderRadius: 11,
  },
  colorWhite,
  nowrap,
  pointerNone,
  bgcBlack,
  opacity0,
  {
    border: '1px solid #000',
    transition: 'opacity 0.2s ease, visibility 0s ease 0.2s, color 0.2s ease',
  },
  parent('.no-touch', inlineBlock),
  parent('.no-touch a:hover >', showHintStyle),
  parent('.no-touch button:hover >', showHintStyle),
)

const Hint = ({ className, children }) =>
  <span className={classNames('Hint', `${hintStyle}`, className)}>{children}</span>

Hint.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
}
Hint.defaultProps = {
  className: null,
}

export default Hint

