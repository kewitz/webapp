import React, { PropTypes, PureComponent } from 'react'
import FormControl from '../forms/FormControl'
import { CheckIconLG } from '../assets/Icons'
import { hireUser } from '../../networking/api'
import { css, disabled, focus, hover, media, select } from '../../styles/jss'
import {
  absolute,
  bgc9,
  bgcA,
  bgcGreen,
  center,
  colorA,
  colorWhite,
  fontSize14,
  fontSize18,
  fontSize24,
  minBreak2,
  mr10,
  relative,
  w100,
} from '../../styles/jso'
import { dialogStyle as baseDialogStyle } from './Dialog'

const dialogStyle = css(
  w100,
  { maxWidth: 440 },
  select('& .CheckIconLG', absolute, { top: 7, left: -40, transform: 'scale(0.6)' }),
  select('& .CheckIconLG > g', { stroke: '#00d100' }),
)
const headingStyle = css(relative, { marginBottom: 30 }, fontSize18, media(minBreak2, fontSize24))
const buttonStyle = css(
  { height: 50, lineHeight: '50px', padding: '0 20px', borderRadius: 5 },
  fontSize14,
  colorA,
  center,
  { transition: 'background-color 0.2s ease, color 0.2s ease' },
  focus(colorWhite),
  hover(colorWhite),
  disabled(colorWhite, bgcA),
)
const confirmButtonStyle = css(buttonStyle, mr10, colorWhite, bgcGreen)
const okayButtonStyle = css(buttonStyle, w100, colorWhite, bgcA, focus(bgc9), hover(bgc9))

export default class MessageDialog extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    titlePrefix: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.state = { isValid: false, scene: 'renderCompose' }
    this.messageValue = ''
  }

  onChangeMessageControl = ({ message }) => {
    this.messageValue = message
    this.updateFormState()
  }

  onConfirm = () => {
    this.props.onConfirm({
      message: this.messageValue,
    })
    this.setState({ scene: 'renderSent' })
  }

  updateFormState() {
    const { isValid } = this.state
    if (!isValid && this.messageValue.length) {
      this.setState({ isValid: true })
    } else if (isValid && !this.messageValue.length) {
      this.setState({ isValid: false })
    }
  }

  renderCompose() {
    const { name, onDismiss, titlePrefix } = this.props
    const { isValid } = this.state
    return (
      <div className={`${baseDialogStyle} ${dialogStyle}`}>
        <h2 className={headingStyle}>{`${titlePrefix} ${name}`}</h2>
        <form
          action={hireUser(null).path}
          className="MessageForm"
          id="MessageForm"
          method="POST"
          noValidate="novalidate"
          onSubmit={this.onConfirm}
          role="form"
        >
          <FormControl
            classList="MessageMessageControl isBoxControl"
            id="message"
            kind="textarea"
            label="Message"
            name="message[message]"
            onChange={this.onChangeMessageControl}
            placeholder="Message"
            tabIndex="2"
          />
        </form>
        <button
          className={confirmButtonStyle}
          disabled={!isValid}
          onClick={this.onConfirm}
        >
          Submit
        </button>
        <button
          className={buttonStyle}
          onClick={onDismiss}
        >
          Cancel
        </button>
      </div>
    )
  }

  renderSent() {
    const { name, onDismiss } = this.props
    return (
      <div className={`${baseDialogStyle} ${dialogStyle}`}>
        <h2 className={headingStyle}>
          <CheckIconLG />
          <span>{`Email sent to ${name}`}</span>
        </h2>
        <button
          className={okayButtonStyle}
          onClick={onDismiss}
        >
          Okay
        </button>
      </div>
    )
  }

  render() {
    const { scene } = this.state
    return this[scene]()
  }
}

