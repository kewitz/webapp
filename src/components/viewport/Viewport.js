// @flow
import React from 'react'
import classNames from 'classnames'
import { css } from '../../styles/jss'
import { displayNone, hidden } from '../../styles/jso'

const baseStyle = css(displayNone, hidden)

type Props = {
  isAuthenticationView: boolean,
  isDiscoverView: boolean,
  isNavbarHidden: boolean,
  isNotificationsActive: boolean,
  isOnboardingView: boolean,
  isProfileMenuActive: boolean,
  userDetailPathClassName: string | null,
}

export const Viewport = (props: Props) =>
  <div
    className={classNames(
      'Viewport',
      { isAuthenticationView: props.isAuthenticationView },
      { isDiscoverView: props.isDiscoverView },
      { isNavbarHidden: props.isNavbarHidden },
      { isNotificationsActive: props.isNotificationsActive },
      { isOnboardingView: props.isOnboardingView },
      { isProfileMenuActive: props.isProfileMenuActive },
      props.userDetailPathClassName,
      `${baseStyle}`,
    )}
    role="presentation"
  />

export default Viewport

