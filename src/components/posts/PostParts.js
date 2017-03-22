// @flow
import React, { PropTypes, PureComponent } from 'react'
import { Link } from 'react-router'
import { $, compose, hover } from 'glamor'
import {
  BubbleIcon,
  EyeIcon,
  HeartIcon,
  RepostIcon,
  ShareIcon,
} from '../assets/Icons'
import Hint from '../hints/Hint'
import {
  absolute,
  colorA,
  bgcWhite,
  flex,
  flood,
  fontSize12,
  fontSize14,
  justifyCenter,
  justifySpaceAround,
  inlineBlock,
  itemsCenter,
  ml10,
  mr10,
  opacity0,
  opacity1,
  pointer,
  px10,
  relative,
  transitionOpacity,
  zIndex2,
} from '../../styles/jso'

const postToolsSpikeStyle = compose(
  absolute,
  flood,
  flex,
  justifyCenter,
  itemsCenter,
  zIndex2,
  opacity0,
  pointer,
  transitionOpacity,
  hover(opacity1),
)

const toolsStyle = compose(
  relative,
  bgcWhite,
  px10,
  {
    width: 'calc(100% - 90px)',
    height: 90,
    borderRadius: 10,
  },
)

const iconsStyle = compose(
  flex,
  justifySpaceAround,
  itemsCenter,
  { height: 60 },
)

const buttonStyle = compose(
  colorA,
  { margin: 'auto' },
  $(' > svg', { transform: 'scale(1.4)' }),
)

const linkStyle = compose(
  inlineBlock,
  colorA,
  { marginLeft: 40 },
  $(' > svg', { transform: 'scale(1.4)' }),
  $(' > svg g + circle', { fill: '#aaa' }),
)

const linkTextStyle = compose(ml10, fontSize14)

const textBoxStyle = compose(
  absolute,
  fontSize12,
  { bottom: 10, left: 20 },
)

const countWrapperStyle = compose(mr10, colorA)
const countStyle = compose({ color: '#7c7c7c' })

type Props = {
  detailPath: string,
  postViewsCountRounded: string,
  postCommentsCount: number,
  postLovesCount: number,
  postRepostsCount: number,
}

export class PostToolsSpike extends PureComponent {
  props: Props

  static contextTypes = {
    onClickToggleComments: PropTypes.func.isRequired,
    onClickLovePost: PropTypes.func.isRequired,
    onClickRepostPost: PropTypes.func.isRequired,
    onClickSharePost: PropTypes.func.isRequired,
  }

  render() {
    const {
      detailPath,
      postCommentsCount,
      postLovesCount,
      postRepostsCount,
      postViewsCountRounded,
    } = this.props
    return (
      <div className={postToolsSpikeStyle}>
        <div className={toolsStyle}>
          <div className={iconsStyle}>
            <button className={buttonStyle} onClick={this.context.onClickToggleComments} >
              <BubbleIcon />
              <Hint>Comment</Hint>
            </button>
            <button className={buttonStyle} onClick={this.context.onClickLovePost} >
              <HeartIcon />
              <Hint>Love</Hint>
            </button>
            <button className={buttonStyle} onClick={this.context.onClickRepostPost} >
              <RepostIcon />
              <Hint>Repost</Hint>
            </button>
            <button className={buttonStyle} onClick={this.context.onClickSharePost}>
              <ShareIcon />
              <Hint>Share</Hint>
            </button>
            <Link className={linkStyle} to={detailPath}>
              <EyeIcon />
              <span className={linkTextStyle}>{postViewsCountRounded}</span>
              <Hint>Views</Hint>
            </Link>
          </div>
          <div className={textBoxStyle}>
            <span className={countWrapperStyle}>
              <span className={countStyle}>{postCommentsCount}</span><span> Comments</span>
            </span>
            <span className={countWrapperStyle}>
              <span className={countStyle}>{postLovesCount}</span><span> Loves</span>
            </span>
            <span className={countWrapperStyle}>
              <span className={countStyle}>{postRepostsCount}</span><span> Reposts</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default PostToolsSpike

