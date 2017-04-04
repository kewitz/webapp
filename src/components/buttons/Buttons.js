import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { css, hover } from '../../styles/jss'
import * as s from '../../styles/jso'

const miniPillStyle = css(
  s.h30,
  s.lh30,
  { borderRadius: 15 },
  s.py0,
  s.px10,
  s.fontSize12,
  s.colorWhite,
  s.bgcBlack,
  s.borderBlack,
  { transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' },
  hover(s.colorWhite, s.bgcGreen, { borderColor: '#00d101' }),
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

const miniPillButtonProfileStyle = css(miniPillStyle, { width: 58 }, s.mr5, s.px0)
export const MiniPillButtonProfile = ({ children, onClick }) =>
  <button className={miniPillButtonProfileStyle} onClick={onClick}>{children}</button>
MiniPillButtonProfile.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

// -------------------------------------

const miniPillLinkStyle = css(miniPillStyle, s.inlineBlock, s.alignTop)
export const MiniPillLink = ({ children, to }) =>
  <Link className={miniPillLinkStyle} to={to}>{children}</Link>
MiniPillLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

