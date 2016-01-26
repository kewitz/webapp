import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import * as MAPPING_TYPES from '../../constants/mapping_types'
import { findBy } from '../../components/base/json_helper'
import { loadUserDetail, loadUserPosts, loadUserUsers } from '../../actions/user'
import Cover from '../../components/assets/Cover'
import StreamComponent from '../../components/streams/StreamComponent'
import UserList from '../../components/users/UserList'

class UserDetail extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    json: PropTypes.object.isRequired,
    params: PropTypes.shape({
      type: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(loadUserDetail(`~${params.username}`))
  }

  static preRender = (store, routerState) =>
    store.dispatch(loadUserDetail(`~${routerState.params.username}`));

  findModel(json, initModel) {
    if (!initModel || !initModel.findObj || !initModel.collection) {
      return null
    }
    return findBy(initModel.findObj, initModel.collection, json)
  }

  render() {
    const { json, params } = this.props
    const type = params.type || 'posts'
    const user = this.findModel(json, {
      collection: MAPPING_TYPES.USERS,
      findObj: { username: params.username },
    })
    const userEls = []
    if (user) {
      userEls.push(<Cover coverImage={ user.coverImage } key={ `userDetailCover_${user.id}` } />)
      userEls.push(<UserList
        classList="asUserDetailHeader"
        ref={ `UserList_${user.id}` }
        user={ user }
        key={ `userDetailUserList_${user.id}` }
        showBlockMuteButton
      />)
    }
    let streamAction = null
    if (type === 'following' || type === 'followers') {
      streamAction = loadUserUsers(`~${params.username}`, type)
    } else {
      streamAction = loadUserPosts(`~${params.username}`, type)
    }
    return (
      <div className="UserDetails">
        <section className="UserDetail Panel">
          <Helmet title={`${params.username}`} />
          { userEls }
          <StreamComponent
            ref="streamComponent"
            action={ streamAction }
          />
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    json: state.json,
  }
}

export default connect(mapStateToProps, null, null, { withRef: true })(UserDetail)

