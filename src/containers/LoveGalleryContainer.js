import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import { loadUserLovesAsGallery } from '../actions/user'
import { selectParamsUsername } from '../selectors/params'
import StreamContainer from '../containers/StreamContainer'
import { MainView } from '../components/views/MainView'

function mapStateToProps(state, props) {
  const username = selectParamsUsername(state, props)
  const streamAction = loadUserLovesAsGallery(`~${username}`)
  return { username, streamAction }
}

class LoveGalleryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    streamAction: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dispatch, username } = this.props
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, username } = this.props
  }

  shouldComponentUpdate(nextProps, nextState) {
    return [
      'username',
    ].some(prop => nextProps[prop] !== this.props[prop])
  }

  render() {
    const {
      dispatch,
      username,
      streamAction,
    } = this.props

    const streamProps = { action: streamAction }

    return (
      <MainView className="Gallery">
        {streamAction && <StreamContainer {...streamProps} />}
      </MainView>
    )
  }
}

export default connect(mapStateToProps)(LoveGalleryContainer)

