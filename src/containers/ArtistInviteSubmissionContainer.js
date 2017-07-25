import Immutable from 'immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { css, media, parent } from '../styles/jss'
import * as s from '../styles/jso'

const titleStyle = css(
  s.sansBlack,
  s.fontSize24,
  s.truncate,
  media(s.minBreak3, s.mb20, parent('.ArtistInvitesDetail', s.mb0, s.fontSize38)),
)

class ArtistInviteSubmissionContainer extends PureComponent {
  static propTypes = {
    links: PropTypes.object,
  }

  static defaultProps = {
    links: Immutable.List([]),
  }

  render() {
    const { links } = this.props
    return (
      <div className="Submissions">
        {links.filter(l => l.get('type') === 'artist_invite_submission_stream').map(l => <h2 className={titleStyle}>{l.get('label')}</h2>)
        }
      </div>
    )
  }
}

export default connect()(ArtistInviteSubmissionContainer)

