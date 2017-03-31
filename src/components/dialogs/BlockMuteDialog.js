import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { css, hover, media, modifier } from '../../styles/jss'
import {
  alignTop,
  bgcWhite,
  bgcBlack,
  borderWhite,
  colorBlack,
  colorWhite,
  center,
  fontSize14,
  fontSize18,
  fontSize24,
  inlineBlock,
  mb20,
  mb40,
  minBreak2,
  mt0,
  mt40,
  nowrap,
  w100,
} from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const dialogStyle = css({ maxWidth: 400 }, media(minBreak2, { maxWidth: 800 }))
const columnStyle = media(minBreak2, inlineBlock, alignTop, { maxWidth: 'calc(33.33333% - 30px)' })
const siblingColumnStyle = css(mt40, media(minBreak2, mt0, { marginLeft: 30 }))
const headingStyle = css(mb40, fontSize18, { height: 30, lineHeight: '30px' }, media(minBreak2, fontSize24))
const buttonHighlightStyle = css(colorWhite, bgcBlack, { borderColor: '#000' })
const buttonStyle = css(
  w100,
  { height: 40, lineHeight: '40px' },
  mb20,
  fontSize14,
  colorBlack,
  center,
  nowrap,
  bgcWhite,
  borderWhite,
  {
    borderRadius: 20,
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  },
  hover(buttonHighlightStyle),
  modifier('.isActive', buttonHighlightStyle, hover(colorBlack, bgcWhite, { borderColor: '#fff' })),
)

const BlockMuteDialog = ({
  isBlockActive = false,
  isMuteActive = false,
  onBlock,
  onFlag,
  onMute,
  username,
  }) => {
  const blockButtonClasses = classNames({ isActive: isBlockActive }, `${buttonStyle}`)
  const muteButtonClasses = classNames({ isActive: isMuteActive }, `${buttonStyle}`)
  const blockButtonText = isBlockActive ? 'Unblock' : 'Block'
  const muteButtonText = isMuteActive ? 'Unmute' : 'Mute'

  return (
    <div className={`${baseDialogStyle} ${dialogStyle}`}>
      <h2 className={headingStyle}>{`Would you like to mute, block or flag @${username}?`}</h2>
      <div>
        <div className={columnStyle}>
          <button className={muteButtonClasses} onClick={onMute}>
            {muteButtonText}
          </button>
          <p>
            Muting prevents further email notifications from a user and removes
            their past activity from your feed. The user is still able to
            follow you and can still comment on your posts, but you will not
            receive any notifications.
          </p>
        </div>
        <div className={`${columnStyle} ${siblingColumnStyle}`}>
          <button className={blockButtonClasses} onClick={onBlock}>
            {blockButtonText}
          </button>
          <p>
            Blocking mutes a user, and disables them from viewing your profile
            and posts. When blocking, we recommend setting your account to
            &quot;Non-Public&quot; to disable your profile from being viewed by people
            outside of the Ello network.
          </p>
        </div>
        <div className={`${columnStyle} ${siblingColumnStyle}`}>
          <button className={buttonStyle} onClick={onFlag}>
            Flag User
          </button>
          <p>
            Report @{username} for violating our rules.
          </p>
        </div>
      </div>
    </div>
  )
}

BlockMuteDialog.propTypes = {
  isBlockActive: PropTypes.bool.isRequired,
  isMuteActive: PropTypes.bool.isRequired,
  onBlock: PropTypes.func.isRequired,
  onFlag: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default BlockMuteDialog

