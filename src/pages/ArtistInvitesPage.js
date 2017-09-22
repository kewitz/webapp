import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadArtistInvites } from '../actions/artist_invites'
import StreamContainer from '../containers/StreamContainer'
import { HeroHeader } from '../components/heros/HeroRenderables'
import { MainView } from '../components/views/MainView'
import { selectQueryPreview } from '../selectors/routing'
import { media } from '../styles/jss'
import { maxBreak2 } from '../styles/jso'
import { selectDPI } from '../selectors/gui'

const streamStyle = media(maxBreak2, {
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
})

const mapStateToProps = state => ({
  dpi: selectDPI(state),
  isPreview: selectQueryPreview(state) === 'true',
})

class ArtistInvitesPage extends Component {

  static propTypes = {
    dpi: PropTypes.string.isRequired,
    isPreview: PropTypes.bool,
    sources: PropTypes.object,
    avatarSources: PropTypes.object,
  }

  static defaultProps = {
    isPreview: false,
    sources: Immutable.fromJS({
      optimized: { url: 'https://assets2.ello.co/uploads/asset/attachment/5428169/ello-optimized-1ca21ad6.jpg', metadata: 'optimized' },
      mdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/5428169/ello-mdpi-1ca21ad6.jpg', metadata: 'mdpi' },
      hdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/5428169/ello-hdpi-1ca21ad6.jpg', metadata: 'hdpi' },
      xhdpi: { url: 'https://assets1.ello.co/uploads/asset/attachment/5428169/ello-xhdpi-1ca21ad6.jpg', metadata: 'xhdpi' },
    }),
    avatarSources: Immutable.fromJS({
      original: { url: 'https://assets2.ello.co/uploads/user/avatar/293083/ello-ebffe9cd-a071-4ea9-9a87-2c2e5be00ac2.jpeg', metadata: 'optimized' },
      small: { url: 'https://assets0.ello.co/uploads/user/avatar/293083/ello-small-ca6f2068.png', metadata: 'mdpi' },
      regular: { url: 'https://assets0.ello.co/uploads/user/avatar/293083/ello-regular-ca6f2068.png', metadata: 'hdpi' },
      large: { url: 'https://assets1.ello.co/uploads/user/avatar/293083/ello-large-ca6f2068.png', metadata: 'xhdpi' },
    }),
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { dpi, sources, avatarSources } = this.props
    return (
      <MainView className="ArtistInvites">
        <HeroHeader
          dpi={dpi}
          headerText="ARTIST INVITES™"
          subHeaderText="Next-level <a href='https://ello.co/wtf/artists/'>Artist</a> x <a href='https://ello.co/wtf/brands-and-agencies/'>Brand</a> collaboration."
          sources={sources}
          avatarSources={avatarSources}
          username="deanastacia"
        />
        <StreamContainer
          action={loadArtistInvites(this.props.isPreview)}
          className={`${streamStyle}`}
          hasShowMoreButton
          paginatorText="Load More"
          paginatorCentered
          shouldInfiniteScroll={false}
        />
      </MainView>
    )
  }
}

export default connect(mapStateToProps)(ArtistInvitesPage)

