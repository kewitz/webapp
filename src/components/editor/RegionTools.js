import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../actions/modals'
import { DragIcon, XIcon } from '../assets/Icons'
import ConfirmDialog from '../dialogs/ConfirmDialog'
import { css, hover, parent } from '../../styles/jss'
import {
  absolute,
  colorA,
  colorBlack,
  displayNone,
  inlineBlock,
  rotate90,
  zIndex2,
} from '../../styles/jso'

const toolsStyle = css(
  absolute,
  { top: 5, right: 5 },
  zIndex2,
  colorA,
  parent('.BlockPlaceholder >', displayNone),
  parent('.ZeroState', displayNone),
)

const dragButtonStyle = css(
  displayNone,
  rotate90,
  { cursor: 'move' },
  hover(colorBlack),
  parent('.no-touch', inlineBlock),
  parent('.editor-region[data-num-blocks="1"]', displayNone),
)

const removeButtonStyle = css(
  hover(colorBlack),
  parent('.editor:not(.hasContent)', displayNone),
)

class RegionTools extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    editorId: PropTypes.string.isRequired,
    onRemoveBlock: PropTypes.func.isRequired,
  }

  closeModal = () => {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  deleteContentConfirmed = () => {
    const { onRemoveBlock } = this.props
    this.closeModal()
    onRemoveBlock()
  }

  handleDeleteBlock = () => {
    const { dispatch } = this.props
    dispatch(openModal(
      <ConfirmDialog
        title="Remove this content?"
        onConfirm={this.deleteContentConfirmed}
        onDismiss={this.closeModal}
      />))
  }

  render() {
    const { editorId } = this.props
    return (
      <div className={`RegionTools ${toolsStyle}`}>
        <button className={`BlockRemove ${removeButtonStyle}`} onClick={this.handleDeleteBlock}>
          <XIcon />
        </button>
        <button className={`DragHandler ${dragButtonStyle}`} data-drag-id={editorId}>
          <DragIcon />
        </button>
      </div>
    )
  }
}

export default connect()(RegionTools)

