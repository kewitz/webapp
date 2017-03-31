import React, { PropTypes } from 'react'
import { XIcon } from '../assets/Icons'
import { css, hover, media, select } from '../../styles/jss'
import {
  absolute,
  colorWhite,
  colorA,
  minBreak2,
  minBreak4,
  mxAuto,
  my0,
  p10,
  p20,
  p40,
  relative,
} from '../../styles/jso'

export const dialogStyle = css(
  relative,
  select('.Modal > &', p10, my0, mxAuto, media(minBreak2, p20), media(minBreak4, p40)),
)

const dismissStyle = css(absolute, { top: -10, right: -10 }, colorWhite, hover(colorA))

const Dialog = ({ body, title, onClick }) =>
  <div className={dialogStyle}>
    <h2>{title}</h2>
    <p>{body}</p>
    {onClick && <button className={dismissStyle} onClick={onClick}><XIcon /></button>}
  </div>

Dialog.propTypes = {
  body: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
}

Dialog.defaultProps = {
  body: '',
  onClick: null,
  title: '',
}

export default Dialog

