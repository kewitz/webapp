/* eslint-disable jsx-a11y/no-static-element-interactions */
import Immutable from 'immutable'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'
import ImageAsset from '../assets/ImageAsset'
import { ElloBuyButton } from '../editor/ElloBuyButton'
import { css, select } from '../../styles/jss'
import * as s from '../../styles/jso'

const STATUS = {
  PENDING: 'isPending',
  REQUEST: 'isRequesting',
  SUCCESS: null,
  FAILURE: 'isFailing',
}

const lightBoxInactiveImageStyle = css(
  s.fullWidth,
  s.bgcF2,
  select(
    '> .LightBoxMask',
    s.bgcTransparent,
    select(
      '> .LightBox > .ImageAttachment',
      s.transitionTransform,
      {
        transform: 'scale(1.0)',
      },
    ),
  ),
)

const lightBoxImageStyle = css(
  s.fullWidth,
  s.bgcF2,
  select(
    '> .LightBoxMask',
    s.fullscreen,
    s.fullWidth,
    s.fullHeight,
    s.bgcModal,
    s.zModal,
    { transition: `background-color 0.4s ${s.ease}` },
  ),
  select(
    '> .LightBoxMask > .LightBox',
    s.relative,
    s.containedAlignMiddle,
    s.center,
    select(
      '> .ImageAttachment',
      s.transitionTransform,
    ),
  ),
)

class ImageRegion extends Component {

  static propTypes = {
    asset: PropTypes.object,
    buyLinkURL: PropTypes.string,
    columnWidth: PropTypes.number,
    commentOffset: PropTypes.number,
    content: PropTypes.object.isRequired,
    contentWidth: PropTypes.number,
    detailPath: PropTypes.string.isRequired,
    innerHeight: PropTypes.number,
    innerWidth: PropTypes.number,
    isComment: PropTypes.bool,
    isGridMode: PropTypes.bool.isRequired,
    isNotification: PropTypes.bool,
    shouldUseVideo: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    asset: null,
    buyLinkURL: null,
    columnWidth: 0,
    commentOffset: 0,
    contentWidth: 0,
    innerHeight: 0,
    innerWidth: 0,
    isComment: false,
    isNotification: false,
  }

  static contextTypes = {
    onTrackRelatedPostClick: PropTypes.func,
  }

  componentWillMount() {
    const { shouldUseVideo } = this.props

    this.state = {
      scale: null,
      currentImageHeight: null,
      lightBox: false,
      status: shouldUseVideo ? STATUS.SUCCESS : STATUS.REQUEST,
    }
  }

  componentWillReceiveProps() {
    const { scale } = this.state
    if (scale) {
      this.setImageScale()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.content, this.props.content) ||
      !Immutable.is(nextProps.asset, this.props.asset) ||
      ['buyLinkURL', 'columnWidth', 'contentWidth', 'innerHeight', 'innerWidth', 'isGridMode'].some(prop =>
        nextProps[prop] !== this.props[prop],
      ) ||
      ['scale', 'currentImageHeight', 'lightBox', 'status'].some(prop => nextState[prop] !== this.state[prop])
  }

  onClickStaticImageRegion = () => {
    const { lightBox } = this.state
    if (lightBox) {
      return this.resetImageScale()
    }
    return this.setImageScale()
  }

  onLoadSuccess = (img) => {
    if (this.isBasicAttachment()) {
      const dimensions = this.getBasicAttachmentDimensions(img)
      this.setState({ width: dimensions.width, height: dimensions.height })
    }
    this.setState({ status: STATUS.SUCCESS })
  }

  onLoadFailure = () => {
    this.setState({ status: STATUS.FAILURE })
  }

  getAttachmentMetadata() {
    if (!this.attachment || this.isBasicAttachment()) { return null }
    const optimized = this.attachment.get('optimized')
    const xhdpi = this.attachment.get('xhdpi')
    const hdpi = this.attachment.get('hdpi')
    let width = null
    let height = null

    // Todo: Not sure if we need to calculate hdpi or if xhdpi will work
    if (optimized.getIn(['metadata', 'width'])) {
      width = Number(optimized.getIn(['metadata', 'width']))
      height = Number(optimized.getIn(['metadata', 'height']))
    } else if (xhdpi.getIn(['metadata', 'width'])) {
      width = Number(xhdpi.getIn(['metadata', 'width']))
      height = Number(xhdpi.getIn(['metadata', 'height']))
    } else if (hdpi.getIn(['metadata', 'width'])) {
      width = Number(hdpi.getIn(['metadata', 'width']))
      height = Number(hdpi.getIn(['metadata', 'height']))
    }
    return {
      width,
      height,
      ratio: width ? width / height : null,
    }
  }

  // Use the lowest of the size constraints to ensure we don't go askew, go
  // below 1:1 pixel density, or go above the desired grid cell height
  getImageDimensions(metadata = this.getAttachmentMetadata()) {
    if (!metadata) { return metadata }
    const { columnWidth, commentOffset, contentWidth, isGridMode, isComment } = this.props
    const { height, ratio } = metadata
    const allowableWidth = isGridMode ? columnWidth : contentWidth
    const widthOffset = isGridMode && isComment ? commentOffset : 0
    const calculatedWidth = allowableWidth - widthOffset
    const maxCellHeight = isGridMode ? 1200 : 7500
    const widthConstrainedRelativeHeight = Math.round(calculatedWidth * (1 / ratio))
    const hv = Math.min(widthConstrainedRelativeHeight, height, maxCellHeight)
    const wv = Math.round(hv * ratio)
    return {
      width: wv,
      height: hv,
      ratio,
    }
  }

  getBasicAttachmentDimensions(img) {
    const height = img.height
    const ratio = img.width / height
    return this.getImageDimensions({ height, ratio })
  }

  getImageSourceSet() {
    const { isGridMode } = this.props
    const images = []
    if (!this.isBasicAttachment()) {
      if (isGridMode) {
        images.push(`${this.attachment.getIn(['mdpi', 'url'])} 375w`)
        images.push(`${this.attachment.getIn(['hdpi', 'url'])} 1920w`)
      } else {
        images.push(`${this.attachment.getIn(['mdpi', 'url'])} 180w`)
        images.push(`${this.attachment.getIn(['hdpi', 'url'])} 750w`)
        images.push(`${this.attachment.getIn(['xhdpi', 'url'])} 1500w`)
        images.push(`${this.attachment.getIn(['optimized', 'url'])} 1920w`)
      }
    }
    return images.join(', ')
  }

  setImageScale() {
    const dimensions = this.getImageDimensions()
    const imageHeight = dimensions.height
    const imageWidth = dimensions.width

    const innerHeight = (this.props.innerHeight - 80)
    const innerWidth = (this.props.innerWidth - 80)

    const imageHeightOnScreen = this.imageOnScreen.clientHeight

    const innerRatio = innerWidth / innerHeight
    const imageRatio = imageWidth / imageHeight

    let scale = null

    if (imageRatio < innerRatio) {
      scale = (innerHeight / imageHeight)
    } else {
      scale = (innerWidth / imageWidth)
    }

    this.setState({
      scale,
      currentImageHeight: imageHeightOnScreen,
      lightBox: true,
    })
  }

  resetImageScale() {
    const imageHeightOnScreen = this.imageOnScreen.clientHeight

    this.setState({
      scale: null,
      currentImageHeight: imageHeightOnScreen,
      lightBox: false,
    })
  }

  isBasicAttachment() {
    const { asset } = this.props
    return !asset || !asset.get('attachment')
  }

  isGif() {
    return this.attachment.getIn(['optimized', 'metadata', 'type']) === 'image/gif'
  }

  renderGifAttachment() {
    const { content, isNotification } = this.props
    const { scale } = this.state
    const dimensions = this.getImageDimensions()
    return (
      <ImageAsset
        alt={content.get('alt') ? content.get('alt').replace('.gif', '') : null}
        className="ImageAttachment"
        height={isNotification ? 'auto' : dimensions.height}
        onLoadFailure={this.onLoadFailure}
        onLoadSuccess={this.onLoadSuccess}
        role="presentation"
        src={this.attachment.getIn(['optimized', 'url'])}
        width={isNotification ? null : dimensions.width}
        style={{ transform: scale ? `scale(${scale})` : null }}
      />
    )
  }

  renderImageAttachment() {
    const { content, isNotification } = this.props
    const { scale } = this.state
    const srcset = this.getImageSourceSet()
    const dimensions = this.getImageDimensions()
    return (
      <ImageAsset
        alt={content.get('alt') ? content.get('alt').replace('.jpg', '') : null}
        className="ImageAttachment"
        height={isNotification ? 'auto' : dimensions.height}
        onLoadFailure={this.onLoadFailure}
        onLoadSuccess={this.onLoadSuccess}
        role="presentation"
        srcSet={srcset}
        src={this.attachment.getIn(['hdpi', 'url'])}
        width={isNotification ? null : dimensions.width}
        style={{ transform: scale ? `scale(${scale})` : null }}
      />
    )
  }

  renderLegacyImageAttachment() {
    const { content, isNotification } = this.props
    const attrs = { src: content.get('url') }
    const { width, height } = this.state
    const stateDimensions = width ? { width, height } : {}
    if (isNotification) {
      attrs.height = 'auto'
    }
    return (
      <ImageAsset
        alt={content.get('alt') ? content.get('alt').replace('.jpg', '') : null}
        className="ImageAttachment"
        onLoadFailure={this.onLoadFailure}
        onLoadSuccess={this.onLoadSuccess}
        role="presentation"
        {...stateDimensions}
        {...attrs}
      />
    )
  }

  renderVideoAttachment() {
    const { height, width } = this.getImageDimensions()
    return (
      <video
        autoPlay
        height={height}
        loop
        muted
        playsInline
        width={width}
      >
        <track kind="captions" />
        <source src={this.attachment.getIn(['video', 'url'])} />
      </video>
    )
  }

  renderAttachment() {
    const { asset, shouldUseVideo } = this.props
    if (!this.isBasicAttachment()) {
      this.attachment = asset.get('attachment')
      if (shouldUseVideo) {
        return this.renderVideoAttachment()
      } else if (this.isGif()) {
        return this.renderGifAttachment()
      }
      return this.renderImageAttachment()
    }
    return this.renderLegacyImageAttachment()
  }

  renderRegionAsLink() {
    const { buyLinkURL, detailPath } = this.props
    return (
      <div className="RegionContent">
        <Link to={detailPath} onClick={this.context.onTrackRelatedPostClick}>
          {this.renderAttachment()}
        </Link>
        {
          buyLinkURL && buyLinkURL.length ?
            <ElloBuyButton to={buyLinkURL} /> :
            null
        }
      </div>
    )
  }

  renderRegionAsStatic() {
    const { lightBox } = this.state
    const { currentImageHeight } = this.state
    const { buyLinkURL } = this.props
    return (
      <div
        className={`${lightBox ? lightBoxImageStyle : lightBoxInactiveImageStyle}`}
        ref={(imageOnScreen) => { this.imageOnScreen = imageOnScreen }}
        onClick={this.onClickStaticImageRegion}
        style={{ height: currentImageHeight }}
      >
        <div className="LightBoxMask">
          <div className="LightBox">
            {this.renderAttachment()}
            {
              buyLinkURL && buyLinkURL.length ?
                <ElloBuyButton to={buyLinkURL} /> :
                null
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isGridMode, detailPath } = this.props
    const { status } = this.state
    const asLink = isGridMode && detailPath
    return (
      <div className={classNames('ImageRegion', status)} >
        {asLink ? this.renderRegionAsLink() : this.renderRegionAsStatic()}
      </div>
    )
  }
}

export default ImageRegion

