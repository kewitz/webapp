import React, { PropTypes } from 'react'
import { css, hover, media, modifier, select } from '../../styles/jss'
import {
  alignMiddle,
  bgcBlack,
  bgcWhite,
  borderWhite,
  center,
  colorBlack,
  colorWhite,
  ease,
  fontSize14,
  fontSize18,
  fontSize24,
  inlineBlock,
  mb0,
  mb10,
  minBreak2,
  mr20,
  nowrap,
} from '../../styles/jso'

const dialogStyle = css(center)
// TODO: exports used by DeleteAccountDialog, move to Dialog
export const headingStyle = css(
  { height: 30, lineHeight: '30px' }, mb10, fontSize18, nowrap,
  media(minBreak2, inlineBlock, mr20, mb0, fontSize24, alignMiddle),
)
const buttonHighlightStyle = css(colorWhite, bgcBlack, { borderColor: '#000' })
export const buttonStyle = css(
  inlineBlock,
  { width: 60, height: 40, lineHeight: '40px', borderRadius: 20 },
  fontSize14,
  colorBlack,
  center,
  nowrap,
  alignMiddle,
  bgcWhite,
  borderWhite,
  { transition: `background-color 0.2s ${ease}, border-color 0.2s ${ease}, color 0.2s ${ease}, opacity 0.2s ${ease}` },
  modifier('.isActive', buttonHighlightStyle),
  hover(buttonHighlightStyle),
  select('& + &', { marginLeft: 5 }),
)

const ConfirmDialog = ({ title, onConfirm, onDismiss }) =>
  <div className={`Dialog ${dialogStyle}`}>
    {title ? <h2 className={headingStyle}>{title}</h2> : null}
    <button className={buttonStyle} onClick={onConfirm}>Yes</button>
    <button className={buttonStyle} onClick={onDismiss}>No</button>
  </div>

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export default ConfirmDialog

