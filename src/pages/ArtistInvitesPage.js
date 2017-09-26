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
      optimized: { url: 'https://assets1.ello.co/uploads/asset/attachment/6068843/ello-optimized-d8de29f9.jpg', metadata: 'optimized' },
      mdpi: { url: 'https://assets1.ello.co/uploads/asset/attachment/6068843/ello-mdpi-d8de29f9.jpg', metadata: 'mdpi' },
      hdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/6068843/ello-hdpi-d8de29f9.jpg', metadata: 'hdpi' },
      xhdpi: { url: 'https://assets1.ello.co/uploads/asset/attachment/6068843/ello-xhdpi-d8de29f9.jpg', metadata: 'xhdpi' },
    }),
    avatarSources: Immutable.fromJS({
      original: { url: 'https://assets0.ello.co/uploads/user/avatar/2994948/ello-ed873787-1511-4aaa-a690-f7ee88903523.jpeg', metadata: 'optimized' },
      small: { url: 'https://assets0.ello.co/uploads/user/avatar/2994948/ello-small-a12660d4.png', metadata: 'mdpi' },
      regular: { url: 'https://assets0.ello.co/uploads/user/avatar/2994948/ello-regular-a12660d4.png', metadata: 'hdpi' },
      large: { url: 'https://assets2.ello.co/uploads/user/avatar/2994948/ello-large-a12660d4.png', metadata: 'xhdpi' },
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
          username="luisagolden"
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

