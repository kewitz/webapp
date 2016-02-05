import React, { Component, PropTypes } from 'react'
import RegionTools from './RegionTools'
import classNames from 'classnames'

class Block extends Component {

  static propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    kind: PropTypes.oneOf([
      'block',
      'embed',
      'image',
      'text',
    ]).isRequired,
    onRemoveBlock: PropTypes.func.isRequired,
    uid: PropTypes.number.isRequired,
  };

  static defaultProps = {
    data: '',
    ref: 'editable',
  };

  removeBlock = () => {
    const { onRemoveBlock, uid } = this.props
    onRemoveBlock(uid)
  };

  render() {
    const { children, className, data, uid } = this.props
    const { width, height } = data
    return (
      <div
        className="editor-block"
        data-collection-id={ uid }
        style={{ width, height }}
        ref="editorBlock"
      >
        <div
          { ...this.props }
          className={classNames('editable', className)}
          style={{ width, height }}
        >
          { children }
        </div>
        <RegionTools onRemoveBlock={ this.removeBlock }/>
      </div>
    )
  }

}

export default Block
