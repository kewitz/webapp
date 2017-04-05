/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react'
import { XIcon } from '../assets/Icons'
import { css, hover, media, select } from '../../styles/jss'
import * as s from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const textDialogStyle = css(
  { maxWidth: 480 },
  s.fontSize18,
  select('& p', s.fontSize18),
  select('& a', s.fontSize18),
)

const dismissStyle = css(
  s.fixed,
  { top: 5, right: 5 },
  hover(s.colorA),
  media(s.minBreak2, { top: 10, right: 10 }),
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

const featuredDialogStyle = css(s.fontSize18, select('& a', s.borderBottom, { lineHeight: 1 }))
export const FeaturedInDialog = ({ children }) =>
  <div className={`${baseDialogStyle} ${featuredDialogStyle}`}>
    {children}
  </div>
FeaturedInDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

