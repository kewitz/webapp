/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectDPI } from 'ello-brains/selectors/gui'
import BackgroundImage from '../components/assets/BackgroundImage'
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
import { css, media, select } from '../styles/jss'
import * as s from '../styles/jso'

const containerStyle = css(
  s.sansRegular,
  s.fontSize14,
  media(s.minBreak3, { width: 'calc(50% - 10px)' }),
)

const imageContainerStyle = css(
  s.relative,
  { height: 235 },
  media(s.minBreak2, { height: 220 }),
)

const contentContainerStyle = css(
  { backgroundColor: '#f2f2f2', height: 250 },
  s.py30,
  s.px20,
)

const titleStyle = css(
  s.sansBlack,
  s.fontSize24,
)

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
      links,
      logoImage,
      openedAt,
      shortDescription,
      slug,
      status,
      submissionBodyBlock,
      title,
    } = this.props
    return (
      <article className={containerStyle}>
        <div className={imageContainerStyle}>
          <BackgroundImage dpi={dpi} sources={logoImage} />
          <BackgroundImage dpi={dpi} sources={headerImage} />
        </div>
        <div className={contentContainerStyle}>
          <h2 className={titleStyle}>{title}</h2>
          <p>{inviteType}</p>
          <p>{status}</p>
          <p>{`${openedAt} — ${closedAt}`}</p>
          <div>
            <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </div>
        </div>
      </article>
    )
  }
}

export default connect(mapStateToProps)(ArtistInviteContainer)

