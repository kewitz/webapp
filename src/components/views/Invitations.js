import React from 'react'
import PropTypes from 'prop-types'
import { MainView } from '../views/MainView'
import StreamContainer from '../../containers/StreamContainer'
import InvitationFormContainer from '../../containers/InvitationFormContainer'
import { css } from '../../styles/jss'
import * as s from '../../styles/jso'

const mainStyle = css(
  s.mxAuto,
  { maxWidth: 1440 },
)

const columnStyle = css(
  { width: '50%' },
  s.inlineBlock,
)

export const Invitations = ({ streamAction }) =>
  <MainView className={`${mainStyle}`}>
    <div className={columnStyle}>
      <header className="InvitationsHeader">
        <h1 className="InvitationsHeading">Invite some cool people</h1>
        <p>Help Ello grow.</p>
      </header>
      <InvitationFormContainer />
    </div>
    <div className={columnStyle}>
      <h2 className="InvitationsStreamHeading">{'People you\'ve invited'}</h2>
      <StreamContainer action={streamAction} />
    </div>
  </MainView>

Invitations.propTypes = {
  streamAction: PropTypes.object.isRequired,
}

export default Invitations

