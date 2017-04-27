import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { XIcon } from '../assets/Icons'
import ImageAsset from '../assets/ImageAsset'
import Hint from '../hints/Hint'
import { after, before, css, hover, media, modifier, parent, select } from '../../styles/jss'
import * as s from '../../styles/jso'

// -------------------------------------

const badgeButtonStyle = css(s.fontSize14, s.colorWhite, s.ml10)

export const BadgeButton = ({ name, src, ...elementProps }) => (
  <button className={badgeButtonStyle} {...elementProps}>
    <ImageAsset alt={name} src={src} width={24} height={24} />
    <Hint>{name}</Hint>
  </button>
)

BadgeButton.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

// -------------------------------------
// exported styles for Onboarding category buttons :(

export const categoryLinkStyle = css(
  s.flex,
  s.justifyCenter,
  s.itemsCenter,
  s.relative,
  { width: 'calc(50% - 20px)', height: 144 },
  s.px20,
  s.mb20,
  s.ml20,
  s.fontSize16,
  s.colorWhite,
  s.center,
  s.alignMiddle,
  s.bgcBlack,
  { backgroundSize: 'cover' },
  before(
    s.absolute,
    s.flood,
    s.zIndex2,
    s.transitionBgColor,
    { content: '""', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  ),
  hover(before({ backgroundColor: 'rgba(0, 0, 0, 0.6)' })),
  modifier('.isActive', before({ backgroundColor: 'rgba(0, 0, 0, 0.8)' })),
  media(s.minBreak2, { height: 275 }, s.fontSize24),
  media(s.minBreak3, { width: 'calc(33.33333% - 20px)' }),
  media(s.minBreak4, s.mb40, s.ml40, { width: 'calc(25% - 40px)' }),
  media(s.minBreak5, { width: 'calc(20% - 40px)' }),
  media(s.minBreak6, { width: 'calc(16.66666% - 40px)' }),
  media(s.minBreak7, { width: 'calc(14.28571% - 40px)' }),
)

export const categoryLinkTextStyle = css(
  s.relative,
  s.zIndex3,
  s.inlineBlock,
  s.mxAuto,
  s.truncate,
  after(
    s.absolute,
    { top: 22, left: 0, width: 0, height: 1, content: '""' },
    s.transitionWidth,
    s.bgcWhite,
  ),
  parent(':hover >', after(s.fullWidth)),
  parent('.isActive >', s.overflowVisible),
  select('& .CheckIconSM', s.absolute, { top: 0, left: -20 }),
  select('& .CheckIconSM g', { stroke: '#00d100' }),
  media(
    s.minBreak2,
    after({ top: 32 })),
    select('& .CheckIconSM', { top: 5 }),
)

export const CategoryLink = ({ children, imageUrl, to }) => (
  <Link
    className={categoryLinkStyle}
    to={to}
    style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : null}
  >
    <span className={categoryLinkTextStyle}>{children}</span>
  </Link>
)
CategoryLink.propTypes = {
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string,
  to: PropTypes.string.isRequired,
}

CategoryLink.defaultProps = {
  imageUrl: null,
}

// -------------------------------------

const dismissButtonStyle = css(
  s.absolute,
  { top: 5, right: 5 },
  s.zIndex2,
  s.transitionColor,
  hover(s.colorA),
  media(s.minBreak2, { top: 10, right: 10 }),
)

export const DismissButton = () =>
  <button className={`CloseModal ${dismissButtonStyle}`}><XIcon /></button>

// -------------------------------------

const miniPillStyle = css(
  s.hv30,
  s.lh30,
  { borderRadius: 15 },
  s.py0,
  s.px10,
  s.fontSize12,
  s.colorWhite,
  s.bgcBlack,
  s.borderBlack,
  { transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' },
  hover(s.colorWhite, s.bgcGreen, { borderColor: '#00d100' }),
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

