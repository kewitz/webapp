/* eslint-disable react/no-multi-comp */
// @flow
import React, { PropTypes, PureComponent } from 'react'
// import { Link } from 'react-router'
import {
  BubbleIcon,
  // EyeIcon,
  HeartIcon,
  RepostIcon,
  ShareIcon,
} from '../assets/Icons'
import Hint from '../hints/Hint'
import { css, hover, parent, select } from '../../styles/jss'
import {
  absolute,
  colorA,
  bgcWhite,
  flex,
  flood,
  fontSize12,
  // fontSize14,
  justifyCenter,
  justifySpaceAround,
  inlineBlock,
  itemsCenter,
  // ml10,
  mr10,
  opacity0,
  opacity1,
  pointer,
  px10,
  relative,
  transitionOpacity,
  zIndex2,
} from '../../styles/jso'

const postToolsSpikeStyle = css(
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

const toolsStyle = css(
  relative,
  bgcWhite,
  px10,
  {
    width: 230,
    height: 60,
    borderRadius: 30,
  },
)

const iconsStyle = css(
  flex,
  justifySpaceAround,
  itemsCenter,
  { height: 60 },
)

const buttonStyle = css(
  colorA,
  { margin: 'auto' },
  select('& > svg', { transform: 'scale(1.4)' }),
)

// const linkStyle = css(
//   inlineBlock,
//   colorA,
//   { marginLeft: 40 },
//   select('& > svg', { transform: 'scale(1.4)' }),
//   select('& > svg g + circle', { fill: '#aaa' }),
// )

// const linkTextStyle = css(ml10, fontSize14)

export class PostToolsSpike extends PureComponent {
  static contextTypes = {
    onClickToggleComments: PropTypes.func.isRequired,
    onClickLovePost: PropTypes.func.isRequired,
    onClickRepostPost: PropTypes.func.isRequired,
    onClickSharePost: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={`PostToolsSpike ${postToolsSpikeStyle}`}>
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
          </div>
        </div>
      </div>
    )
  }
}

const textBoxStyle = css(
  fontSize12,
  { marginTop: 30 },
  opacity0,
  transitionOpacity,
  parent('.Post:hover', opacity1),
)
const countWrapperStyle = css(inlineBlock, mr10, colorA)
const countStyle = css({ color: '#7c7c7c' })

type Props = {
  postCommentsCount: number,
  postLovesCount: number,
  postRepostsCount: number,
}

export class PostStatsSpike extends PureComponent {
  props: Props

  render() {
    const {
      postCommentsCount,
      postLovesCount,
      postRepostsCount,
    } = this.props
    return (
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
    )
  }
}
        // <Link className={linkStyle} to={detailPath}>
        //   <EyeIcon />
        //   <span className={linkTextStyle}>{postViewsCountRounded}</span>
        //   <Hint>Views</Hint>
        // </Link>
