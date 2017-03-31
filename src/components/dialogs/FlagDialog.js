import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { before, css, hover, media, modifier, select } from '../../styles/jss'
import {
  absolute,
  alignLeft,
  bgc6,
  bgcBlack,
  bgcWhite,
  block,
  borderBlack,
  center,
  colorBlack,
  colorWhite,
  fontSize14,
  fontSize18,
  fontSize24,
  leftAlign,
  mb20,
  minBreak2,
  minBreak4,
  mt10,
  relative,
  w100,
  zIndex1,
  zIndex2,
} from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const flags = {
  spam: 'Spam',
  violence: 'Violence',
  copyright: 'Copyright infringement',
  threatening: 'Threatening',
  hate_speech: 'Hate Speech',
  adult: 'Adult content that isn\'t marked NSFW*',
  offensive: 'I don\'t like it',
}

const OFFSETS = { mobile: 70, tablet: 80, desktop: 100 }

const dialogStyle = css(
  { maxWidth: 480 },
  colorBlack,
  bgcWhite,
  media(minBreak2, { minWidth: 480, maxWidth: 580 }),
)

const headingStyle = css(
  { height: 40, lineHeight: '40px' },
  mb20,
  fontSize18,
  media(minBreak2, fontSize24),
)

const footnoteStyle = css(
  { margin: '20px 0 0' },
  before({ marginLeft: -10, content: '"* "' }),
)

const buttonStyle = css(
  { height: 60, lineHeight: '60px' },
  fontSize14,
  colorWhite,
  bgcBlack,
  borderBlack,
  { transition: 'background-color 0.2s ease, border-color 0.2s ease, width 0.2s ease' },
  hover(bgc6, { borderColor: '#666' }),
)

const okayAndChoiceButtons = css(
  relative,
  zIndex2,
  block,
  w100,
  { padding: '0 20px' },
  alignLeft,
)

const okayButtonStyle = css(buttonStyle, okayAndChoiceButtons, center)
const choiceButtonStyle = css(
  buttonStyle,
  okayAndChoiceButtons,
  leftAlign,
  modifier('.isActive', { width: 'calc(100% - 140px)', borderColor: '#666' }, bgc6),
  select('& + &', mt10),
)
const flagButtonStyle = css(
  buttonStyle,
  absolute,
  { top: 0, right: 20, minWidth: 120 },
  zIndex1,
  media(minBreak4, { right: 40 }),
)

export default class FlagDialog extends Component {

  static propTypes = {
    deviceSize: PropTypes.string.isRequired,
    onResponse: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.state = {
      activeChoice: null,
      scene: 'renderChoicesScreen',
    }
  }

  onClickChoiceWasMade = () => {
    const { onResponse } = this.props
    const { activeChoice } = this.state
    this.setState({ scene: 'renderConfirmationScreen' })
    onResponse({ flag: activeChoice })
  }

  onClickChoice = (e) => {
    const { activeChoice } = this.state
    const dataFlag = e.target.dataset.flag
    const newChoice = dataFlag === activeChoice ? null : dataFlag
    this.setState(
      { activeChoice: newChoice },
    )
  }

  renderFlagChoices() {
    const { activeChoice } = this.state
    const buttons = []
    Object.keys(flags).forEach((choice) => {
      buttons.push(
        <button
          className={classNames({ isActive: activeChoice === choice }, `${choiceButtonStyle}`)}
          data-flag={choice}
          key={choice}
          onClick={this.onClickChoice}
        >
          {flags[choice]}
        </button>,
      )
    })
    return buttons
  }

  renderChoicesScreen() {
    const { activeChoice } = this.state
    const index = Object.keys(flags).indexOf(activeChoice)
    const top = index < 0 ? null : (70 * index) + OFFSETS[this.props.deviceSize]
    return (
      <div className={`${baseDialogStyle} ${dialogStyle}`}>
        <h2 className={headingStyle}>Would you like to flag this content as:</h2>
        <div>
          {this.renderFlagChoices()}

          <button
            className={flagButtonStyle}
            onClick={this.onClickChoiceWasMade}
            style={top ? { top, display: 'inline-block' } : { display: 'none' }}
          >
            Submit
          </button>

        </div>
        <p className={footnoteStyle}>
          Ello allows adult content as long as it complies with our rules and is
          marked NSFW. You may temporarily still see this content. You may want
          to block or mute this user as well.
        </p>
      </div>
    )
  }

  renderConfirmationScreen() {
    const { onConfirm } = this.props
    return (
      <div className={`${baseDialogStyle} ${dialogStyle}`}>
        <h2 className={headingStyle}>Thank you.</h2>
        <p>
          You may temporarily still see this content. You may want to block or
          mute this user as well.
        </p>
        <div>
          <button className={okayButtonStyle} onClick={onConfirm}>Okay</button>
        </div>
      </div>
    )
  }

  render() {
    const { scene } = this.state
    return this[scene]()
  }
}

