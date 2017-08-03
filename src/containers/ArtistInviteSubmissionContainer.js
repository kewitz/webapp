import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendAdminAction } from '../actions/artist_invites'
import {
  selectSubmissionActions,
  selectSubmissionPostId,
  selectSubmissionStatus,
} from '../selectors/artist_invites'
import PostContainer from './PostContainer'

function mapStateToProps(state, props) {
  return {
    actions: selectSubmissionActions(state, props),
    postId: selectSubmissionPostId(state, props),
    status: selectSubmissionStatus(state, props),
  }
}

class ArtistInviteSubmissionContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    status: PropTypes.string,
  }

  static defaultProps = {
    actions: null,
    status: null,
  }

  static childContextTypes = {
    onClickAction: PropTypes.func,
  }

  getChildContext() {
    return {
      onClickAction: this.onClickAction,
    }
  }

  onClickAction = (action) => {
    const { dispatch } = this.props
    dispatch(sendAdminAction(action))
  }

  render() {
    const {
      actions,
      postId,
      status,
    } = this.props
    return (
      <PostContainer postId={postId} adminActions={actions} submissionStatus={status} />
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteSubmissionContainer)

