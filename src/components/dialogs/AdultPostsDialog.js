import React, { PropTypes } from 'react'
import { css, hover, media } from '../../styles/jss'
import {
  bgc6,
  bgcBlack,
  bgcWhite,
  block,
  borderBlack,
  center,
  colorBlack,
  colorWhite,
  fontSize14,
  minBreak2,
  mt0,
  w100,
} from '../../styles/jso'

const dialogStyle = css(
  { maxWidth: 480 },
  colorBlack,
  bgcWhite,
  media(minBreak2, { minWidth: 480 }),
)

const buttonStyle = css(
  block,
  w100,
  { height: 60, lineHeight: '60px' },
  fontSize14,
  colorWhite,
  center,
  bgcBlack,
  borderBlack,
  { transition: 'background-color 0.2s ease, border-color 0.2s ease' },
  hover(bgc6, { borderColor: '#666' }),
)

const AdultPostsDialog = ({ onConfirm }) =>
  <div className={`Dialog ${dialogStyle}`}>
    <p style={mt0}>
      If you post adult content, you must mark your account Not Safe for Work (NSFW).
    </p>
    <p>
      When you set &quot;Post Adult Content&quot; to yes, users who do not wish to view
      adult content will not see your posts.
    </p>
    <button className={buttonStyle} onClick={onConfirm}>Okay</button>
  </div>

AdultPostsDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
}

export default AdultPostsDialog

