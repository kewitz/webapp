import React, { PropTypes } from 'react'
import { MoneyIcon } from '../assets/Icons'
import { dispatchTrackEvent } from '../../helpers/junk_drawer'
import { before, css, hover, parent, select } from '../../styles/jss'
import {
  absolute,
  alignMiddle,
  bgcE,
  bgcGreen,
  center,
  colorBlack,
  colorWhite,
  displayNone,
  hitarea,
  nowrap,
  overflowHidden,
  zIndex2,
} from '../../styles/jso'

const buttonStyle = css(
  absolute,
  { top: 40, right: 30 },
  zIndex2,
  { width: 40, height: 40, lineHeight: '39px', borderRadius: 20 },
  overflowHidden,
  colorWhite,
  center,
  nowrap,
  alignMiddle,
  bgcGreen,
  { transition: 'background-color 0.2s ease, color 0.2s ease' },
  before(hitarea),
  hover(colorBlack, bgcE),
  select('.editable[contenteditable] + &', displayNone),
  parent('.EmbedRegion', { top: 10, right: 10 }),
  parent('.RegionContent', { top: 10, right: 10 }),
  parent('.Notification', { width: 15, height: 15, lineHeight: '14px' }),
  parent('.Notification .RegionContent', { top: 5, right: 5 }),
  select('.Notification & svg', { transform: 'scale(0.7)', transformOrigin: '2px 2px' }),
  // TODO: This is weird, has nothing to do with Embed button but came from CSS file...
  select('.EmbedRegion .embetter a', { lineHeight: '40px' }),
)

function onElloBuyButtonClick(e) {
  dispatchTrackEvent('buy_link_clicked', { link: e.target.href })
}

export const ElloBuyButton = ({ to }) =>
  <a
    className={`ElloBuyButton ${buttonStyle}`}
    href={to}
    onClick={onElloBuyButtonClick}
    rel="noopener noreferrer"
    target="_blank"
  >
    <MoneyIcon />
  </a>

ElloBuyButton.propTypes = {
  to: PropTypes.string.isRequired,
}

export default ElloBuyButton

