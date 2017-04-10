/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react'
import { DismissButton } from '../../components/buttons/Buttons'
import { css, select } from '../../styles/jss'
import * as s from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const textDialogStyle = css(
  { maxWidth: 480 },
  s.fontSize18,
  select('& p', s.fontSize18),
  select('& a', s.fontSize18),
)

export const TextMarkupDialog = ({ html }) =>
  <div className={`${baseDialogStyle} ${textDialogStyle}`}>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <DismissButton />
  </div>

TextMarkupDialog.propTypes = {
  html: PropTypes.string.isRequired,
}

// -------------------------------------

const featuredDialogStyle = css(s.fontSize18, select('& a', s.borderBottom, { lineHeight: 1 }))
const nestedDismissStyle = css(s.absolute, { top: -15, right: -15 })
export const FeaturedInDialog = ({ children }) =>
  <div className={`${baseDialogStyle} ${featuredDialogStyle}`}>
    {children}
    <div className={nestedDismissStyle}>
      <DismissButton />
    </div>
  </div>
FeaturedInDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

