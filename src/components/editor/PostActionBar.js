import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
  ArrowIcon,
  BrowseIcon,
  CameraIcon,
  MoneyIconCircle,
  ReplyAllIcon,
  XIconLG,
} from '../assets/Icons'
import { openModal, closeModal } from '../../actions/modals'
import { updateBuyLink } from '../../actions/editor'
import BuyLinkDialog from '../dialogs/BuyLinkDialog'
import { selectDeviceSize } from '../../selectors/gui'
import { css, disabled, hover, media, modifier, parent, select } from '../../styles/jss'
import * as s from '../../styles/jso'

const wrapperStyle = css(
  s.flex,
  s.justifySpaceBetween,
  s.hv40,
  s.lh40,
  s.mt10,
)

const leftStyle = css(
  select('& button', s.mr10),
  select('& button:last-child', s.mr0),
)

const rightStyle = css(
  select('& button + button', s.ml10),
  select('& button:first-child', s.ml0),
)

const buttonStyle = css(
  s.bgcBlack,
  s.colorWhite,
  s.hv40,
  s.lh40,
  s.nowrap,
  s.wv40,
  { borderRadius: 5, transition: `background-color 0.2s ease, color 0.2s ease, width 0.2s ${s.ease}` },
  disabled(s.pointerNone, s.bgcA),
  hover(s.bgcGreen),
  media(
    s.minBreak2,
    { width: 'auto' },
  ),
  modifier('.isBuyLinked', s.bgcGreen),
  modifier('.forComment', s.bgcGreen, disabled(s.bgcA), hover(s.bgcBlack), media(s.minBreak2, parent('.PostDetail', { width: 'auto' }))),
  modifier('.forPost', s.bgcGreen, disabled(s.bgcA), hover(s.bgcBlack), { width: 'auto' }),
  parent('.isComment', s.wv40, media(s.minBreak2, s.wv40)),
  parent('.PostGrid', s.wv40, media(s.minBreak2, s.wv40)),
)
const labelStyle = css(
  s.displayNone,
  s.ml20,
  s.mr10,
  media(s.minBreak2, s.inlineBlock, select('& + .SVGIcon', { marginRight: 20 })),
  media(s.minBreak2, parent('.PostDetail .forComment', s.inlineBlock, select('& + .SVGIcon', { marginRight: 20 }))),
  parent('.forPost', s.inlineBlock, select('& + .SVGIcon', { marginRight: 20 })),
  parent('.isComment', s.displayNone, select('& + .SVGIcon', s.mr0)),
  parent('.PostGrid', s.displayNone, select('& + .SVGIcon', s.mr0)),
)
const hide = css(s.hide)

function mapStateToProps(state) {
  return {
    deviceSize: selectDeviceSize(state),
  }
}

class PostActionBar extends Component {

  static propTypes = {
    buyLink: PropTypes.string,
    cancelAction: PropTypes.func.isRequired,
    deviceSize: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    disableSubmitAction: PropTypes.bool.isRequired,
    editorId: PropTypes.string.isRequired,
    handleFileAction: PropTypes.func.isRequired,
    hasMedia: PropTypes.bool,
    replyAllAction: PropTypes.func,
    submitAction: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
  }

  static defaultProps = {
    buyLink: null,
    hasMedia: false,
    replyAllAction: null,
  }

  onAddBuyLink = ({ value }) => {
    const { dispatch, editorId } = this.props
    dispatch(updateBuyLink(editorId, value))
    this.onCloseModal()
  }

  onCloseModal = () => {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  submitted = () => {
    const { submitAction } = this.props
    submitAction()
  }

  handleFileBrowser = (e) => {
    const { handleFileAction } = this.props
    handleFileAction(e)
    this.fileBrowser.value = ''
  }

  browse = () => {
    this.browseButton.blur()
    this.fileBrowser.click()
  }

  cancel = () => {
    this.props.cancelAction()
  }

  money = () => {
    const { dispatch, buyLink } = this.props
    dispatch(openModal(
      <BuyLinkDialog
        onConfirm={this.onAddBuyLink}
        onDismiss={this.onCloseModal}
        text={buyLink}
      />))
  }

  render() {
    const { deviceSize, disableSubmitAction, hasMedia, replyAllAction, submitText } = this.props
    const isBuyLinked = this.props.buyLink && this.props.buyLink.length
    return (
      <div className={wrapperStyle}>
        <div className={leftStyle}>
          <button
            className={`PostActionButton forUpload ${buttonStyle}`}
            onClick={this.browse}
            ref={(comp) => { this.browseButton = comp }}
          >
            <span className={labelStyle}>Upload</span>
            {deviceSize === 'mobile' ? <CameraIcon /> : <BrowseIcon />}
          </button>

          <button
            className={classNames('PostActionButton forMoney', { isBuyLinked }, `${buttonStyle}`)}
            disabled={!hasMedia}
            onClick={this.money}
          >
            <span className={labelStyle}>Sell</span>
            <MoneyIconCircle />
          </button>

          <button className={`PostActionButton forCancel ${buttonStyle}`} onClick={this.cancel}>
            <span className={labelStyle}>Cancel</span>
            <XIconLG />
          </button>
        </div>

        <div className={rightStyle}>
          {
            replyAllAction ?
              <button className={`PostActionButton forReplyAll ${buttonStyle}`} onClick={replyAllAction}>
                <span className={labelStyle}>Reply All</span>
                <ReplyAllIcon />
              </button> :
              null
          }

          <button
            className={`PostActionButton for${submitText} ${buttonStyle}`}
            disabled={disableSubmitAction}
            ref={(comp) => { this.submitButton = comp }}
            onClick={this.submitted}
          >
            <span className={labelStyle}>{submitText}</span>
            <ArrowIcon />
          </button>
        </div>

        <input
          className={hide}
          onChange={this.handleFileBrowser}
          ref={(comp) => { this.fileBrowser = comp }}
          type="file"
          accept="image/*"
          multiple
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PostActionBar)

