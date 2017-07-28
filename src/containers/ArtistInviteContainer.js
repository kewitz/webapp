import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EDITOR } from 'ello-brains/constants/action_types'
import { selectIsLoggedIn } from 'ello-brains/selectors/authentication'
import { selectDPI } from 'ello-brains/selectors/gui'
import { trackEvent } from '../actions/analytics'
import { openOmnibar } from '../actions/omnibar'
import { scrollToPosition } from '../lib/jello'
import {
  selectClosedAt,
  selectDescription,
  selectGuide,
  selectHeaderImage,
  selectId,
  selectInviteType,
  selectLinks,
  selectLogoImage,
  selectOpenedAt,
  selectShortDescription,
  selectSlug,
  selectStatus,
  selectSubmissionBodyBlock,
  selectTitle,
} from '../selectors/artist_invites'
import {
  ArtistInviteDetail,
  ArtistInviteGrid,
} from '../components/artist_invites/ArtistInviteRenderables'
import { getEditorId } from '../components/editor/Editor'

function mapStateToProps(state, props) {
  return {
    // artistInvite fields
    closedAt: selectClosedAt(state, props),
    description: selectDescription(state, props),
    guide: selectGuide(state, props),
    headerImage: selectHeaderImage(state, props),
    id: selectId(state, props),
    inviteType: selectInviteType(state, props),
    links: selectLinks(state, props),
    logoImage: selectLogoImage(state, props),
    openedAt: selectOpenedAt(state, props),
    shortDescription: selectShortDescription(state, props),
    slug: selectSlug(state, props),
    status: selectStatus(state, props),
    submissionBodyBlock: selectSubmissionBodyBlock(state, props),
    title: selectTitle(state, props),
    // other
    dpi: selectDPI(state),
    isLoggedIn: selectIsLoggedIn(state),
  }
}

class ArtistInviteContainer extends PureComponent {
  static propTypes = {
    closedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dpi: PropTypes.string.isRequired,
    guide: PropTypes.object.isRequired,
    headerImage: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    inviteType: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    kind: PropTypes.oneOf(['detail', 'grid']).isRequired,
    links: PropTypes.object.isRequired,
    logoImage: PropTypes.object.isRequired,
    openedAt: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    submissionBodyBlock: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  static childContextTypes = {
    onClickArtistInviteDetail: PropTypes.func,
    onClickScrollToContent: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }

  getChildContext() {
    return {
      onClickArtistInviteDetail: this.onClickArtistInviteDetail,
      onClickScrollToContent: this.onClickScrollToContent,
      onClickSubmit: this.onClickSubmit,
    }
  }

  onClickArtistInviteDetail = () => {
    const { dispatch, slug } = this.props
    dispatch(trackEvent('clicked_artist_invite_detail', { slug }))
  }

  onClickScrollToContent = () => {
    scrollToPosition(0, document.querySelector('.Submissions').offsetTop)
  }

  onClickSubmit = () => {
    const { dispatch, id, submissionBodyBlock } = this.props
    const editorId = getEditorId()
    dispatch(openOmnibar())
    // do this in a rAF to allow the editor to initialize first if it needs to
    requestAnimationFrame(() => {
      dispatch({
        type: EDITOR.APPEND_TEXT,
        payload: {
          editorId,
          text: submissionBodyBlock,
        },
      })
      dispatch({
        type: 'EDITOR.ADD_ARTIST_INVITE_ID',
        payload: {
          editorId,
          artistInviteId: id,
        },
      })
    })
    scrollToPosition(0, 0)
  }

  render() {
    const {
      closedAt,
      description,
      dpi,
      guide,
      headerImage,
      inviteType,
      isLoggedIn,
      kind,
      links,
      logoImage,
      openedAt,
      shortDescription,
      slug,
      status,
      submissionBodyBlock,
      title,
    } = this.props
    switch (kind) {
      case 'detail':
        return (
          <ArtistInviteDetail
            closedAt={closedAt}
            description={description}
            dpi={dpi}
            guide={guide}
            headerImage={headerImage}
            inviteType={inviteType}
            isLoggedIn={isLoggedIn}
            links={links}
            logoImage={logoImage}
            openedAt={openedAt}
            status={status}
            submissionBodyBlock={submissionBodyBlock}
            title={title}
          />
        )
      case 'grid':
        return (
          <ArtistInviteGrid
            closedAt={closedAt}
            dpi={dpi}
            headerImage={headerImage}
            inviteType={inviteType}
            logoImage={logoImage}
            openedAt={openedAt}
            shortDescription={shortDescription}
            slug={slug}
            status={status}
            title={title}
          />
        )
      default:
        return null
    }
  }
}

export default connect(mapStateToProps)(ArtistInviteContainer)

