import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadArtistInviteDetail } from '../actions/artist_invites'
import { Paginator } from '../components/streams/Paginator'
import { MainView } from '../components/views/MainView'
import ArtistInviteContainer from '../containers/ArtistInviteContainer'
import { selectArtistInvite } from '../selectors/artist_invites'

const mapStateToProps = (state, props) => ({
  artistInvite: selectArtistInvite(state, props),
  slug: props.params.slug,
})

class ArtistInvitesDetailPage extends Component {

  static propTypes = {
    artistInvite: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
  }

  static defaultProps = {
    artistInvite: null,
  }

  componentWillMount() {
    const { dispatch, slug } = this.props
    dispatch(loadArtistInviteDetail(`~${slug}`))
  }

  render() {
    console.log('DETAIL PAGE MOTHER FUCKER')
    console.log('slug', this.props.slug)
    const { artistInvite } = this.props
    return (
      <MainView className="ArtistInvitesDetail">
        { artistInvite && artistInvite.get('id') ?
          <ArtistInviteContainer
            artistInviteId={artistInvite.get('id')}
            kind="grid"
          /> :
          <section className="StreamContainer">
            <Paginator className="isBusy" />
          </section>
        }
      </MainView>
    )
  }
}

export default connect(mapStateToProps)(ArtistInvitesDetailPage)

