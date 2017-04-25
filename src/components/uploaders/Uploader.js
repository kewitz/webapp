import React, { PropTypes, PureComponent } from 'react'
import classNames from 'classnames'
import { PROFILE } from '../../constants/action_types'
import * as ElloAndroidInterface from '../../lib/android_interface'

class Uploader extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    kind: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    line3: PropTypes.string,
    saveAction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: '',
    kind: null,
    line1: null,
    line2: null,
    line3: null,
    title: '',
  }

  componentWillMount() {
    this.state = {
      hasDragOver: false,
    }
  }

  onFileBrowse = (e) => {
    const file = e.target.files[0]
    return this.props.saveAction(file)
  }

  onClickFileBrowser = () => {
    if (ElloAndroidInterface.supportsNativeImagePicker()) {
      ElloAndroidInterface.launchImagePicker(this.props.kind)
    } else {
      this.fileBrowser.click()
    }
  }

  onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    this.setState({ hasDragOver: false })
    return this.props.saveAction(file)
  }

  onDragOver = (e) => {
    e.preventDefault()
    this.setState({ hasDragOver: true })
  }

  onDragLeave = (e) => {
    e.preventDefault()
    this.setState({ hasDragOver: false })
  }

  render() {
    const { className, title, line1, line2, line3 } = this.props
    const classList = classNames(
      'Uploader',
      className,
      { hasDragOver: this.state.hasDragOver },
    )

    return (
      <button
        className={classList}
        onClick={this.onClickFileBrowser}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
      >
        <span className="UploaderButton">
          {title}
        </span>
        <div className="UploaderMessages">
          {line1 && <p>{line1}</p>}
          {line2 && <p>{line2}</p>}
          {line3 && <p>{line3}</p>}
        </div>
        <input
          className="hidden"
          onChange={this.onFileBrowse}
          ref={(comp) => { this.fileBrowser = comp }}
          type="file"
          accept="image/*"
        />
      </button>
    )
  }
}

export default Uploader

