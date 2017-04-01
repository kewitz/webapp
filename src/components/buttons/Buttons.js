import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { css, hover } from '../../styles/jss'
import {
  alignTop,
  bgcBlack,
  bgcGreen,
  borderBlack,
  colorWhite,
  fontSize12,
  inlineBlock,
  px0,
  px10,
  py0,
} from '../../styles/jso'

const miniPillStyle = css(
  { height: 30, lineHeight: '30px', borderRadius: 15 },
  py0,
  px10,
  fontSize12,
  colorWhite,
  bgcBlack,
  borderBlack,
  { transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' },
  hover(colorWhite, bgcGreen, { borderColor: '#00d101' }),
)

// -------------------------------------

const miniPillButtonStyle = css(miniPillStyle)
export const MiniPillButton = ({ children, onClick }) =>
  <button className={miniPillButtonStyle} onClick={onClick}>{children}</button>
MiniPillButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

// -------------------------------------

const miniPillButtonProfileStyle = css(miniPillStyle, { width: 58, marginRight: 5 }, px0)
export const MiniPillButtonProfile = ({ children, onClick }) =>
  <button className={miniPillButtonProfileStyle} onClick={onClick}>{children}</button>
MiniPillButtonProfile.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

// -------------------------------------

const miniPillLinkStyle = css(miniPillStyle, inlineBlock, alignTop)
export const MiniPillLink = ({ children, to }) =>
  <Link className={miniPillLinkStyle} to={to}>{children}</Link>
MiniPillLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

