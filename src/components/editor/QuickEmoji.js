import React, { PropTypes, PureComponent } from 'react'
import sampleSize from 'lodash/sampleSize'
import Emoji from '../assets/Emoji'
import { ElloQuickEmoji } from '../assets/Icons'
import { css, hover, media, parent, select } from '../../styles/jss'
import {
  absolute,
  bgcE,
  color5,
  color9,
  minBreak2,
  ml20,
  nowrap,
  opacity0,
  opacity1,
  pl10,
  transitionColor,
  transitionOpacity,
  zIndex2,
} from '../../styles/jso'

const options = [
  '+1', 'sparkles', 'metal', 'ok_hand', 'v', 'snowman', 'heart', 'panda_face',
  'clap', 'boom', 'star', 'wave', 'raised_hands', 'dizzy', 'sparkling_heart',
  'muscle', 'fire', 'fist', 'ello', 'bread',
]

const choiceButtonStyle = css(
  { marginTop: -5 },
  transitionOpacity,
  hover({ opacity: 0.5 }),
  select('& + &', ml20),
)

const QuickEmojiChoiceButton = ({ name, onClick }) =>
  <button className={choiceButtonStyle} name={name} onClick={onClick}>
    <Emoji name={name} />
  </button>

QuickEmojiChoiceButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

const wrapperStyle = css(
  absolute,
  zIndex2,
  color9,
  nowrap,
  // TODO: Set this from a prop
  parent('.editor.isComment', { top: 92, right: 30 }, media(minBreak2, { top: 52 })),
)
const wrapperActiveStyle = css(wrapperStyle, color5)

const listStyle = (absolute, { top: 0, left: -150 }, pl10, bgcE, opacity0, transitionOpacity)
const listActiveStyle = css(listStyle, opacity1)

const toggleButtonStyle = css(transitionColor, hover(color5))

export default class QuickEmoji extends PureComponent {

  static propTypes = {
    onAddEmoji: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.state = { isActive: false }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('touchstart', this.onDocumentClick)
  }

  onDocumentClick = () => {
    this.hide()
  }

  show = () => {
    this.setState({ isActive: true })
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('touchstart', this.onDocumentClick)
  }

  hide = () => {
    this.setState({ isActive: false })
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('touchstart', this.onDocumentClick)
  }

  emojiWasClicked = (e) => {
    const { onAddEmoji } = this.props
    onAddEmoji({ value: `:${e.target.name}:` })
    this.hide()
  }

  renderEmojis() {
    const samples = sampleSize(options, 4)
    return samples.map(sample =>
      <QuickEmojiChoiceButton key={sample} name={sample} onClick={this.emojiWasClicked} />,
    )
  }

  render() {
    const { isActive } = this.state
    if (isActive) {
      return (
        <div className={wrapperActiveStyle}>
          <div className={listActiveStyle}>
            {this.renderEmojis()}
          </div>
        </div>
      )
    }
    return (
      <div className={wrapperStyle}>
        <button className={toggleButtonStyle} onClick={this.show}>
          <ElloQuickEmoji />
        </button>
        <div className={listStyle} />
      </div>
    )
  }
}

