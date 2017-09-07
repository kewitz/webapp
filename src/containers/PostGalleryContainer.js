import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPostsByIdsWithImages } from '../selectors/post'

function mapStateToProps(state, props) {
  return {
    posts: selectPostsByIdsWithImages(state, props)
  }
}


function mergedContent(post) {
  return [
    ...post.get('content', []),
    ...post.get('repostContent', []),
  ]
}

class PostGalleryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = this.state || {}
    this.state['postIndex'] = 0
    this.state['imageIndex'] = 0
  }

  static propTypes = {
    PostIds: PropTypes.array,
  }

  setFirstImage(nextProps) {
    const post = nextProps['posts'].get(0)
    const imageIndex = mergedContent(post).
      findIndex(b => b.get('kind') === 'image')
    this.setState((prevState, props) => {
      return { ...prevState, imageIndex }
    })
  }

  setNextImage() {
    const { postIndex, imageIndex } = this.state
    const { posts } = this.props
    const currentPost = posts.get(postIndex)
    const nextPost = posts.get(postIndex + 1)
    const nextIndex = mergedContent(currentPost).
      findIndex((b, i) => b.get('kind') === 'image' && i > imageIndex)

    if (nextIndex > 0) {
      this.setState((prevState, props) => {
        return { ...prevState, imageIndex: nextIndex }
      })
    } else if (nextPost) {
      const nextPostNextIndex = mergedContent(nextPost).
        findIndex((b, i) => b.get('kind') === 'image')
      this.setState((prevState, props) => {
        return { ...prevState, postIndex: postIndex + 1, imageIndex: nextPostNextIndex }
      })
    } else {
      console.log('next page...')
    }
  }

  handleClick() {
    const { timer } = this.state
    if (timer) { clearTimeout(timer) }
    this.setNextImage()
  }

  currentImageUrl() {
    const { postIndex, imageIndex } = this.state
    const post = this.props['posts'].get(postIndex)
    if (post) {
      const region = mergedContent(post)[imageIndex]
      return region.getIn(['data', 'url'], '')
    } else {
      ""
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.state['postIndex'] === 0 && this.state['imageIndex'] === 0) {
      this.setFirstImage(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return [
      'imageIndex',
      'postIndex',
    ].some(prop => nextState[prop] !== this.state[prop])
  }

  componentDidUpdate(prevProps, prevState) {
    const timer = setTimeout(() => this.setNextImage(), 7000)
    this.setState((prevState, props) => {
      return { ...prevState, timer }
    })
  }

  componentWillUnmount() {
    const { timer } = this.state
    if (timer) { clearTimeout(timer) }
  }

  render() {
    const img = this.currentImageUrl()

    return (
      <div className="Gallery">
        <button onClick={ () => this.handleClick() }>
          <img src={img} alt="" />
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PostGalleryContainer)
