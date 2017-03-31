/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react'
import { XIcon } from '../assets/Icons'
import { css, hover, media, select } from '../../styles/jss'
import { borderBottom, colorA, fixed, fontSize18, minBreak2 } from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const textDialogStyle = css(
  { maxWidth: 480 },
  fontSize18,
  select('& p', fontSize18),
  select('& a', fontSize18),
)

const dismissStyle = css(
  fixed,
  { top: 5, right: 5 },
  hover(colorA),
  media(minBreak2, { top: 10, right: 10 }),
)

export const TextMarkupDialog = ({ html }) =>
  <div className={`${baseDialogStyle} ${textDialogStyle}`}>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <button className={`CloseModal ${dismissStyle}`}><XIcon /></button>
  </div>

TextMarkupDialog.propTypes = {
  html: PropTypes.string.isRequired,
}

// -------------------------------------

const featuredDialogStyle = css(fontSize18, select('& a', borderBottom, { lineHeight: 1 }))
export const FeaturedInDialog = ({ children }) =>
  <div className={`${baseDialogStyle} ${featuredDialogStyle}`}>
    {children}
  </div>
FeaturedInDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

