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
      optimized: { url: 'https://assets1.ello.co/uploads/asset/attachment/6047062/ello-optimized-aecd3299.jpg', metadata: 'optimized' },
      mdpi: { url: 'https://assets1.ello.co/uploads/asset/attachment/6047062/ello-mdpi-aecd3299.jpg', metadata: 'mdpi' },
      hdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/6047062/ello-hdpi-aecd3299.jpg', metadata: 'hdpi' },
      xhdpi: { url: 'https://assets0.ello.co/uploads/asset/attachment/6047062/ello-xhdpi-aecd3299.jpg', metadata: 'xhdpi' },
    }),
    avatarSources: Immutable.fromJS({
      original: { url: 'https://assets2.ello.co/uploads/user/avatar/14290/ello-ac835574-22c4-43e5-a437-a7364fedcc61.jpeg', metadata: 'optimized' },
      small: { url: 'https://assets1.ello.co/uploads/user/avatar/14290/ello-small-16f0276b.png', metadata: 'mdpi' },
      regular: { url: 'https://assets1.ello.co/uploads/user/avatar/14290/ello-regular-16f0276b.png', metadata: 'hdpi' },
      large: { url: 'https://assets2.ello.co/uploads/user/avatar/14290/ello-large-16f0276b.png', metadata: 'xhdpi' },
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
          subHeaderText="Ello is a global <a href='https://ello.co/wtf/artists/'>community of artists</a> dedicated to creative excellence. Built by artists, for artists."
          sources={sources}
          avatarSources={avatarSources}
          username="skiphursh"
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

