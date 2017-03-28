import React, { PropTypes, PureComponent } from 'react'
import { FORM_CONTROL_STATUS as STATUS } from '../../constants/status_types'
import TextControl from '../forms/TextControl'
import { isValidURL } from '../forms/Validators'
import { css, disabled, focus, hover, select } from '../../styles/jss'
import {
  bgc6,
  bgcA,
  bgcGreen,
  center,
  color6,
  colorA,
  colorWhite,
  ease,
  fontSize14,
  fontSize24,
  mr10,
  pointerNone,
  w100,
} from '../../styles/jso'

const dialogStyle = css(w100, { maxWidth: 440 })
const headingStyle = css({ marginBottom: 30 }, fontSize24)
const buttonHighlightStyle = css(colorWhite, bgc6, { borderColor: '#666' })
const buttonStyle = css(
  {
    width: 100,
    height: 50,
    lineHeight: '50px',
    padding: '0 20px',
    borderRadius: 5,
  },
  fontSize14,
  colorA,
  center,
  { transition: `background-color 0.2s ${ease}, border-color 0.2s ${ease}, color 0.2s ${ease}, width 0.2s ${ease}` },
  disabled(pointerNone, color6, bgcA),
  focus(buttonHighlightStyle),
  hover(buttonHighlightStyle),
)
const submitButtonStyle = css(mr10, colorWhite, bgcGreen)
const removeButtonStyle = css(mr10, colorWhite, bgcA)


// TODO: Move this out to FormControls
const controlStyle = css(
  select('& .FormControlInput.isBoxControl', { height: 50, padding: '0 35px 0 10px' }),
  select('& .FormControlStatus.isBoxControl', { top: 11 }),
)

export default class BuyLinkDialog extends PureComponent {

  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    text: PropTypes.string,
  }

  static defaultProps = {
    text: null,
  }

  componentWillMount() {
    this.value = this.props.text
    this.state = { status: STATUS.INDETERMINATE }
    this.updateStatus({ buyLink: this.value || '' })
  }

  onClickSubmit = () => {
    if (this.value.indexOf('http') !== 0) {
      this.value = `http://${this.value}`
    }
    this.props.onConfirm({ value: this.value })
  }

  onClickReset = () => {
    this.props.onConfirm({ value: null })
  }

  onChangeControl = ({ buyLink }) => {
    this.updateStatus({ buyLink })
    this.value = buyLink
  }

  updateStatus({ buyLink }) {
    const isValid = isValidURL(buyLink)
    const { urlStatus } = this.state
    if (isValid && urlStatus !== STATUS.SUCCESS) {
      this.setState({ urlStatus: STATUS.SUCCESS })
    } else if (!isValid && urlStatus !== STATUS.INDETERMINATE) {
      this.setState({ urlStatus: STATUS.INDETERMINATE })
    }
  }

  render() {
    const { onDismiss, text } = this.props
    const { urlStatus } = this.state
    return (
      <div className={`Dialog ${dialogStyle}`}>
        <h2 className={headingStyle}>Sell your work</h2>
        <TextControl
          autoFocus
          classList={`isBoxControl ${controlStyle}`}
          id="buyLink"
          name="buy[productDetail]"
          onChange={this.onChangeControl}
          placeholder="Product detail URL"
          status={urlStatus}
          tabIndex="1"
          text={text}
        />
        <button
          className={`${buttonStyle} ${submitButtonStyle}`}
          onClick={this.onClickSubmit}
          disabled={!(urlStatus === STATUS.SUCCESS)}
        >
          {text && text.length ? 'Update' : 'Submit'}

        </button>
        {text && text.length ?
          <button
            className={`${buttonStyle} ${removeButtonStyle}`}
            onClick={this.onClickReset}
          >
            Remove
          </button> :
          null
        }
        <button className={buttonStyle} onClick={onDismiss}>Cancel</button>
      </div>
    )
  }
}

