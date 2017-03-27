import React, { PropTypes } from 'react'
import { css, select } from '../../styles/jss'
import { ml10 } from '../../styles/jso'

const baseStyle = css(
  {
    width: 135,
    height: 40,
    background: 'transparent url("/static/images/support/app-store-sprite.png") no-repeat 0 0',
    backgroundSize: 'cover',
  },
  select('& + &', ml10),
)

export const AppleStore = ({ to }) =>
  <a className={baseStyle} href={to} rel="noopener noreferrer" target="_blank">
    <span className="invisible">Apple Store</span>
  </a>

AppleStore.propTypes = {
  to: PropTypes.string.isRequired,
}

AppleStore.defaultProps = {
  to: 'https://itunes.apple.com/app/apple-store/id953614327?pt=117139389&ct=webapp&mt=8',
}

// -------------------------------------

const googleStoreStyle = css({
  backgroundPosition: '-135px 0',
})

export const GooglePlayStore = ({ to }) =>
  <a className={`${baseStyle} ${googleStoreStyle}`} href={to} rel="noopener noreferrer" target="_blank">
    <span className="invisible">Google Play Store</span>
  </a>

GooglePlayStore.propTypes = {
  to: PropTypes.string.isRequired,
}

GooglePlayStore.defaultProps = {
  to: 'https://play.google.com/store/apps/details?id=co.ello.ElloApp',
}

