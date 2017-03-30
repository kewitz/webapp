/* eslint-disable max-len */
import React from 'react'
import { SHORTCUT_KEYS } from '../../constants/application_types'
import { css, media } from '../../styles/jss'
import {
  absolute,
  bgcWhite,
  center,
  colorBlack,
  fontSize12,
  fontSize18,
  fontSize24,
  minBreak2,
  relative,
  mb0,
  monoRegularCSS,
} from '../../styles/jso'

const dialogStyle = css({ maxWidth: 440 }, colorBlack, bgcWhite, media(minBreak2, { minWidth: 440 }))
const headingStyle = css(
  { paddingLeft: 60, marginBottom: 30, lineHeight: 1 },
  fontSize18,
  media(minBreak2, fontSize24),
)

const textWrapperStyle = css(relative, mb0, { paddingLeft: 60 })
const textStyle = css(
  absolute,
  {
    left: 0,
    width: 50,
    height: 22,
    lineHeight: '22px',
    borderRadius: 11,
    color: '#535353',
    backgroundColor: '#e8e8e8',
  },
  fontSize12,
  center,
)

const HelpDialog = () =>
  <div className={`Dialog ${dialogStyle}`}>
    <h2 className={headingStyle}>Key Commands</h2>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.DISCOVER}</span> Navigate to discover</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.SEARCH}</span> Navigate to search</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.FOLLOWING}</span> Navigate to following</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.NOTIFICATIONS}</span> View notifications</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.TOGGLE_LAYOUT}</span> Toggle grid mode for main content</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.OMNIBAR}</span> Focus post editor</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.ESC.toUpperCase()}</span> Close modal or alerts</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.FULLSCREEN}</span> Toggle fullscreen within a post editor</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.DT_GRID_TOGGLE}</span> Toggle layout grid</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.DT_GRID_CYCLE}</span> Toggle between horizontal and vertical grid</p>
    <p className={textWrapperStyle}><span className={`${textStyle} ${monoRegularCSS}`}>{SHORTCUT_KEYS.HELP}</span> Show this help modal</p>
  </div>

export default HelpDialog

