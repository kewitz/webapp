import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import classNames from 'classnames'
import { GUI } from '../../../constants/gui_types'
import { addResizeObject, removeResizeObject } from '../../viewport/ResizeComponent'

const STATUS = {
  PENDING: 'isPending',
  REQUEST: 'isRequesting',
  SUCCESS: null,
  FAILURE: 'isFailing',
}

class ImageRegion extends Component {

  static propTypes = {
    assets: PropTypes.object,
    content: PropTypes.object.isRequired,
    isComment: PropTypes.bool,
    isGridLayout: PropTypes.bool.isRequired,
    isNotification: PropTypes.bool,
    links: PropTypes.object,
    postDetailPath: PropTypes.string,
  }

  static defaultProps = {
    isComment: false,
    isGridLayout: false,
    isNotification: false,
  }

  componentWillMount() {
    const { assets, content } = this.props
    let scale = null
    const assetMatch = content.url && content.url.match(/asset\/attachment\/(\d+)\//)
    if (assetMatch && assets) {
      const assetId = assetMatch[1]
      const asset = this.props.assets[assetId] || this.props.assets[parseInt(assetId, 10)]
      const imageHeight = parseInt(_.get(asset, 'attachment.original.metadata.height'), 10)
      scale = GUI.innerHeight / imageHeight
    }

    this.state = {
      marginBottom: null,
      scale,
      status: STATUS.REQUEST,
      columnWidth: GUI.columnWidth,
      contentWidth: GUI.contentWidth,
      commentOffset: GUI.viewportDeviceSize === 'mobile' ? 40 : 60,
      innerHeight: GUI.innerHeight,
    }
  }

  componentDidMount() {
    addResizeObject(this)
    if (this.state.status === STATUS.REQUEST) {
      this.createLoader()
    }
  }

  componentWillReceiveProps() {
    const { scale } = this.state
    if (scale) {
      this.setImageScale()
    }
  }

  componentDidUpdate() {
    if (this.state.status === STATUS.REQUEST && !this.img) {
      this.createLoader()
    }
  }

  componentWillUnmount() {
    this.disposeLoader()
    removeResizeObject(this)
  }

  onResize({ columnWidth, contentWidth, innerHeight, viewportDeviceSize }) {
    const commentOffset = viewportDeviceSize === 'mobile' ? 40 : 60
    this.setState({ columnWidth, contentWidth, innerHeight, commentOffset })
  }

  onClickStaticImageRegion = () => {
    const { scale } = this.state
    if (scale) {
      return this.resetImageScale()
    } else if (!this.attachment) {
      return null
    }
    return this.setImageScale()
  }

  onLoadSuccess = () => {
    this.disposeLoader()
    this.setState({ status: STATUS.SUCCESS })
  }

  onLoadFailure = () => {
    this.disposeLoader()
    this.setState({ status: STATUS.FAILURE })
  }

  getAttachmentMetadata() {
    if (!this.attachment) { return {} }
    const { optimized, xhdpi, hdpi } = this.attachment
    let width = null
    let height = null

    // Todo: Not sure if we need to calculate hdpi or if xhdpi will work
    if (optimized && optimized.metadata && optimized.metadata.width) {
      width = parseInt(optimized.metadata.width, 10)
      height = parseInt(optimized.metadata.height, 10)
    } else if (xhdpi && xhdpi.metadata && xhdpi.metadata.width) {
      width = parseInt(xhdpi.metadata.width, 10)
      height = parseInt(xhdpi.metadata.height, 10)
    } else if (hdpi && hdpi.metadata && hdpi.metadata.width) {
      width = parseInt(hdpi.metadata.width, 10)
      height = parseInt(hdpi.metadata.height, 10)
    }
    return {
      width,
      height,
      ratio: width ? width / height : null,
    }
  }

  // Use the lowest of the size constraints to ensure we don't go askew, go
  // below 1:1 pixel density, or go above the desired grid cell height
  getImageDimensions() {
    const metadata = this.getAttachmentMetadata()
    if (!metadata) { return metadata }
    const { isGridLayout, isComment } = this.props
    const { columnWidth, contentWidth, commentOffset } = this.state
    const { height, ratio } = metadata
    const allowableWidth = isGridLayout ? columnWidth : contentWidth
    const widthOffset = isGridLayout && isComment ? commentOffset : 0
    const calculatedWidth = allowableWidth - widthOffset
    const maxCellHeight = isGridLayout ? 1200 : 7500
    const widthConstrainedRelativeHeight = Math.round(calculatedWidth * (1 / ratio))
    const hv = Math.min(widthConstrainedRelativeHeight, height, maxCellHeight)
    const wv = Math.round(hv * ratio)
    return {
      width: wv,
      height: hv,
      ratio,
    }
  }

  getImageSourceSet() {
    const { isGridLayout } = this.props
    const images = []
    if (!this.isBasicAttachment()) {
      if (isGridLayout) {
        images.push(`${this.attachment.mdpi.url} 375w`)
        images.push(`${this.attachment.hdpi.url} 1920w`)
      } else {
        images.push(`${this.attachment.mdpi.url} 180w`)
        images.push(`${this.attachment.hdpi.url} 750w`)
        images.push(`${this.attachment.xhdpi.url} 1500w`)
        images.push(`${this.attachment.optimized.url} 1920w`)
      }
    }
    return images.join(', ')
  }

  setImageScale() {
    const dimensions = this.getImageDimensions()
    const imageHeight = dimensions.height
    const innerHeight = GUI.innerHeight - 80
    if (imageHeight && imageHeight > innerHeight) {
      this.setState({
        scale: innerHeight / imageHeight,
        marginBottom: -(imageHeight - innerHeight),
      })
    }
  }

  resetImageScale() {
    this.setState({ scale: null, marginBottom: null })
  }

  isBasicAttachment() {
    const { assets, links } = this.props
    // notifications don't supply the linked assets in a response
    // so we need to see if the asset actually exists here so we
    // can fall back to using just the url
    if (!assets || (assets && links && links.assets && !assets[links.assets])) { return true }
    return !(links && links.assets && assets[links.assets] && assets[links.assets].attachment)
  }

  isGif() {
    const optimized = this.attachment.optimized
    if (optimized && optimized.metadata) {
      return optimized.metadata.type === 'image/gif'
    }
    return false
  }

  createLoader() {
    const isBasicAttachment = this.isBasicAttachment()
    const sources = isBasicAttachment ? this.props.content.url : this.getImageSourceSet()
    this.disposeLoader()
    if (sources) {
      this.img = new Image()
      this.img.onload = this.onLoadSuccess
      this.img.onerror = this.onLoadFailure
      if (isBasicAttachment) {
        this.img.src = sources
      } else {
        this.img.srcset = sources
      }
    }
  }

  disposeLoader() {
    if (this.img) {
      this.img.onload = null
      this.img.onerror = null
      this.img = null
    }
  }

  renderGifAttachment() {
    const { content, isNotification } = this.props
    const dimensions = this.getImageDimensions()
    return (
      <img
        alt={ content.alt ? content.alt.replace('.gif', '') : null }
        className="ImageAttachment"
        src={ this.attachment.optimized.url }
        width={ dimensions.width }
        height={ isNotification ? 'auto' : dimensions.height }
      />
    )
  }

  renderImageAttachment() {
    const { content, isNotification } = this.props
    const srcset = this.getImageSourceSet()
    const dimensions = this.getImageDimensions()
    return (
      <img
        alt={ content.alt ? content.alt.replace('.jpg', '') : null }
        className="ImageAttachment"
        src={ this.attachment.hdpi.url }
        srcSet={ srcset }
        width={ dimensions.width }
        height={ isNotification ? 'auto' : dimensions.height }
      />
    )
  }

  renderLegacyImageAttachment() {
    const { content, isNotification } = this.props
    const dimensions = this.getImageDimensions()
    const attrs = { src: content.url, ...dimensions }
    if (isNotification) {
      attrs.height = 'auto'
    }
    return (
      <img
        alt={ content.alt ? content.alt.replace('.jpg', '') : null }
        className="ImageAttachment"
        { ...attrs }
      />
    )
  }

  renderAttachment() {
    const { assets, links } = this.props
    if (!this.isBasicAttachment()) {
      this.attachment = assets[links.assets].attachment
      return this.isGif() ? this.renderGifAttachment() : this.renderImageAttachment()
    }
    return this.renderLegacyImageAttachment()
  }

  renderRegionAsLink() {
    const { postDetailPath } = this.props
    return (
      <Link to={ postDetailPath } className="RegionContent">
        { this.renderAttachment() }
      </Link>
    )
  }

  renderRegionAsStatic() {
    const { marginBottom, scale } = this.state
    return (
      <div
        className="RegionContent"
        onClick={ this.onClickStaticImageRegion }
        style={{ transform: scale ? `scale(${scale})` : null, marginBottom }}
      >
        { this.renderAttachment() }
      </div>
    )
  }

  render() {
    const { isGridLayout, postDetailPath } = this.props
    const { status } = this.state
    const asLink = isGridLayout && postDetailPath
    return (
      <div className={ classNames('ImageRegion', status) } >
        { asLink ? this.renderRegionAsLink() : this.renderRegionAsStatic() }
      </div>
    )
  }
}

export default ImageRegion

