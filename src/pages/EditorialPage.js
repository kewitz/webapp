import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadEditorials } from '../actions/editorials'
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

class EditorialPage extends Component {

  static propTypes = {
    dpi: PropTypes.string.isRequired,
    isPreview: PropTypes.boolean,
    sources: PropTypes.object,
    avatarSources: PropTypes.object,
  }

  static defaultProps = {
    isPreview: false,
    sources: Immutable.fromJS({
      optimized: { url: 'https://assets1.ello.co/uploads/asset/attachment/2542523/ello-optimized-c553b9c7.jpg', metadata: 'optimized' },
      mdpi: { url: 'https://assets1.ello.co/uploads/asset/attachment/2542523/ello-mdpi-c553b9c7.jpg', metadata: 'mdpi' },
      hdpi: { url: 'https://assets2.ello.co/uploads/asset/attachment/2542523/ello-hdpi-c553b9c7.jpg', metadata: 'hdpi' },
      xhdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/2542523/ello-xhdpi-c553b9c7.jpg', metadata: 'xhdpi' },
    }),
    avatarSources: Immutable.fromJS({
      original: { url: 'https://assets1.ello.co/uploads/user/avatar/930194/ello-b7ae736f-cb24-4994-898e-219be1b0f29d.gif', metadata: 'optimized' },
      small: { url: 'https://assets1.ello.co/uploads/user/avatar/930194/ello-small-b851c6c6.png', metadata: 'mdpi' },
      regular: { url: 'https://assets0.ello.co/uploads/user/avatar/930194/ello-regular-b851c6c6.png', metadata: 'hdpi' },
      large: { url: 'https://assets0.ello.co/uploads/user/avatar/930194/ello-large-b851c6c6.png', metadata: 'xhdpi' },
    }),
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { dpi, sources, avatarSources } = this.props
    return (
      <MainView className="Editorial">
        <HeroHeader
          dpi={dpi}
          headerText="THE CREATORS NETWORK"
          subHeaderText="Ello is a global artist community dedicated to creative excellence — made for artists by artists."
          sources={sources}
          avatarSources={avatarSources}
          username="velvetspectrum"
        />
        <StreamContainer
          action={loadEditorials(this.props.isPreview)}
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

export default connect(mapStateToProps)(EditorialPage)

