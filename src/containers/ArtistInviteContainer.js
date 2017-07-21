import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectDPI } from 'ello-brains/selectors/gui'
import {
  selectClosedAt,
  selectDescription,
  selectGuide,
  selectHeaderImage,
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
import { ArtistInviteGrid } from '../components/artist_invites/ArtistInviteRenderables'

function mapStateToProps(state, props) {
  return {
    // artistInvite fields
    closedAt: selectClosedAt(state, props),
    description: selectDescription(state, props),
    guide: selectGuide(state, props),
    headerImage: selectHeaderImage(state, props),
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
  }
}

class ArtistInviteContainer extends PureComponent {
  static propTypes = {
    closedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dpi: PropTypes.string.isRequired,
    guide: PropTypes.object.isRequired,
    headerImage: PropTypes.object.isRequired,
    inviteType: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired,
    logoImage: PropTypes.object.isRequired,
    openedAt: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    submissionBodyBlock: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const {
      closedAt,
      description,
      dpi,
      guide,
      headerImage,
      inviteType,
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

