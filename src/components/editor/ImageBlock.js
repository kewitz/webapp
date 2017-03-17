import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { before, compose } from 'glamor'
import Block from './Block'
import ImageAsset from '../assets/ImageAsset'
import { ArrowIcon } from '../assets/Icons'
import { absolute, flex, flood, easeInOutCubic, itemsCenter, justifyCenter, relative } from '../../styles/jso'

const busyWrapperStyle = compose(
  absolute,
  flood,
  flex,
  itemsCenter,
  justifyCenter,
  { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
)

const arrowStyle = compose(
  relative,
  {
    padding: 4,
    borderRadius: '50%',
    color: '#aaa',
    backgroundColor: '#fff',
    transform: 'rotate(-90deg)',
  },
  before({
    content: '""',
    ...absolute,
    top: 'calc(50% - 2px)',
    left: 'calc(50% - 10px)',
    width: 4,
    height: 4,
    zIndex: 10,
    backgroundColor: '#fff',
    animation: `animateUploaderMover 0.666s infinite ${easeInOutCubic}`,
  }),
)

const Busy = () =>
  <div className={busyWrapperStyle}>
    <div className={arrowStyle}>
      <ArrowIcon />
    </div>
  </div>

export default class ImageBlock extends Component {

  static propTypes = {
    blob: PropTypes.string,
    data: PropTypes.object,
    isUploading: PropTypes.bool,
  }

  static defaultProps = {
    blob: null,
    data: Immutable.Map(),
    isUploading: false,
  }

  onLoadSuccess = () => {
    const { data } = this.props
    URL.revokeObjectURL(data.get('src'))
  }

  render() {
    const { blob, data, isUploading } = this.props
    return (
      <Block {...this.props}>
        <div className={classNames('editable image', { isUploading })}>
          { isUploading && <Busy /> }
          <ImageAsset
            alt={data.get('alt')}
            onLoadSuccess={this.onLoadSuccess}
            src={blob || data.get('url')}
          />
        </div>
      </Block>
    )
  }
}

