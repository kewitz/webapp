/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router'
import { before, css, hover, media, modifier, parent, select } from '../../styles/jss'
import * as s from '../../styles/jso'
import BackgroundImage from '../assets/BackgroundImage'
import { ArrowIcon } from '../assets/Icons'
import { RoundedRect } from '../buttons/Buttons'

const gridContainerStyle = css(
  s.alignTop,
  s.bgcF2,
  s.fontSize14,
  s.fullWidth,
  s.mb10,
  s.sansRegular,
  s.transitionBgColor,
  media(
    s.minBreak2,
    s.mr20,
    s.mb20,
    { width: 'calc(50% - 10px)' },
    select(':nth-child(2n)', s.mr0),
  ),
  media(
    s.minBreak4,
    s.mr40,
    s.mb40,
    { width: 'calc(50% - 20px)' },
  ),
  hover(s.bgcE5),
)

const imageContainerStyle = css(
  s.relative,
  { height: 235 },
  media(s.minBreak2, { height: 220 }, parent('.ArtistInvitesDetail', s.mb40, { height: 555 })),
  parent('a:hover', select('> .BackgroundImage::before', { backgroundColor: 'rgba(0, 0, 0, 0.25)' })),
  parent('.ArtistInvitesDetail', s.mb20),
)

const contentContainerStyle = css(
  { height: 250 },
  s.p10,
  s.relative,
  media(s.minBreak3, s.py30, s.px20),
  select('> p', s.my0),
)

const titleStyle = css(
  s.sansBlack,
  s.fontSize24,
  s.truncate,
  media(s.minBreak3, s.mb20, parent('.ArtistInvitesDetail', s.mb0, s.fontSize38)),
)

const inviteTypeStyle = css(
  s.colorA,
  s.truncate,
  parent(
    '.ArtistInvitesDetail',
    s.fontSize24,
    s.my0,
    media(s.minBreak3, s.fontSize38),
  ),
)

const textStatusStyle = css(
  s.fontSize24,
  s.mb0,
  s.mt20,
  s.truncate,
  modifier('.closed', { color: '#fe0404' }),
  modifier('.open', { color: '#00d100' }),
  modifier('.preview', { color: '#0409fe' }),
  modifier('.selecting', { color: '#ffb100' }),
  modifier('.upcoming', { color: '#c000ff' }),
  parent('.ArtistInvitesDetail', media(s.minBreak3, s.fontSize38)),
)

const bulletStatusStyle = css(
  { ...textStatusStyle },
  s.fontSize14,
  before(
    {
      borderRadius: 5,
      content: '""',
      height: 10,
      width: 10,
    },
    s.inlineBlock,
    s.mr20,
  ),
  modifier('.closed', before({ backgroundColor: '#fe0404' })),
  modifier('.open', before(s.bgcGreen)),
  modifier('.preview', before({ backgroundColor: '#0409fe' })),
  modifier('.selecting', before({ backgroundColor: '#ffb100' })),
  modifier('.upcoming', before({ backgroundColor: '#c000ff' })),
  media(s.minBreak3, s.absolute, s.mt0, { left: '53%', top: 85 }),
)

const dateRangeStyle = css(
  s.colorA,
  s.truncate,
  media(s.minBreak3, s.absolute, { left: 'calc(53% + 30px)', top: 105 }),
  parent(
    '.ArtistInvitesDetail',
    s.fontSize24,
    s.my0,
    { left: 'auto', position: 'inherit', top: 'auto' },
    media(s.minBreak3, s.fontSize38),
  ),

)

const shortDescriptionStyle = css(
  media(s.minBreak3, s.mt40),
)

const getStatusText = (status) => {
  switch (status) {
    case 'closed':
      return 'Invite Closed'
    case 'open':
      return 'Open For Submissions'
    case 'preview':
      return 'Preview'
    case 'selecting':
      return 'Selections In Progress'
    case 'upcoming':
      return 'Upcoming'
    default:
      return null
  }
}

const renderTextStatus = status => (
  <p className={`${textStatusStyle} ${status}`}>
    {getStatusText(status)}
  </p>
)

const renderBulletStatus = status => (
  <p className={`${bulletStatusStyle} ${status}`}>
    {getStatusText(status)}
  </p>
)

export const ArtistInviteGrid = ({
  closedAt,
  dpi,
  headerImage,
  inviteType,
  logoImage,
  openedAt,
  shortDescription,
  slug,
  status,
  title,
}) => (
  <Link to={`/artist-invites/${slug}`} className={gridContainerStyle}>
    <article>
      <div className={imageContainerStyle}>
        <BackgroundImage dpi={dpi} sources={headerImage} />
        <BackgroundImage dpi={dpi} sources={logoImage} />
      </div>
      <div className={contentContainerStyle}>
        <h2 className={titleStyle}>{title}</h2>
        <p className={inviteTypeStyle}>{inviteType}</p>
        {renderBulletStatus(status)}
        <p className={dateRangeStyle}>{`${moment(openedAt).format('MMMM D')} — ${moment(closedAt).format('MMMM D, YYYY')}`}</p>
        <div className={shortDescriptionStyle}>
          <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </div>
      </div>
    </article>
  </Link>
)
ArtistInviteGrid.propTypes = {
  closedAt: PropTypes.string.isRequired,
  dpi: PropTypes.string.isRequired,
  headerImage: PropTypes.object.isRequired,
  inviteType: PropTypes.string.isRequired,
  logoImage: PropTypes.object.isRequired,
  openedAt: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const detailContainerStyle = css(
  s.maxSiteWidth,
  s.px10,
  s.mxAuto,
  { paddingBottom: 50 },
  media(s.minBreak2, s.px20),
  media(s.minBreak4, s.px0),
  select('& .ArrowIcon', { transform: 'rotate(90deg)' }),
  select(
    '& .RoundedRect',
    s.my20,
    media(
      s.minBreak2,
      modifier('.ScrollButton', s.my40),
      modifier('.SubmitButton', s.mt0),
    ),
    media(
      s.minBreak3,
      modifier('.ScrollButton', s.my60),
    ),
  ),
)

const contentColumnStyle = css(
  s.alignTop,
  s.inlineBlock,
  media(
    s.minBreak2,
    s.mr20,
    s.mb20,
    { width: 'calc(50% - 10px)' },
    select(':nth-child(2n)', s.mr0),
  ),
)

const guideStyle = css(
  s.colorA,
  s.fontSize14,
  select('& .GuideHeader', s.fontSize24, s.mb20, s.sansBlack, s.truncate),
  select('& .GuideContent', s.mb30),
)

export const ArtistInviteDetail = ({
  closedAt,
  description,
  dpi,
  guide,
  headerImage,
  inviteType,
  links,
  logoImage,
  openedAt,
  status,
  submissionBodyBlock,
  title,
}, {
  onClickScrollToContent,
  onClickSubmit,
}) => (
  <div>
    <article className={detailContainerStyle}>
      <div className={imageContainerStyle}>
        <BackgroundImage dpi={dpi} sources={headerImage} />
        <BackgroundImage dpi={dpi} sources={logoImage} />
      </div>
      <div>
        <div className={contentColumnStyle}>
          <h1 className={titleStyle}>{title}</h1>
          <p className={inviteTypeStyle}>{inviteType}</p>
          {renderTextStatus(status)}
          <p className={dateRangeStyle}>{`${moment(openedAt).format('MMMM D')} — ${moment(closedAt).format('MMMM D, YYYY')}`}</p>
          <RoundedRect className="ScrollButton GreenBorder" onClick={onClickScrollToContent}>
            <ArrowIcon />
            See Submissions
          </RoundedRect>
          <div>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <div className={contentColumnStyle}>
          <RoundedRect className="SubmitButton Green isXL" onClick={onClickSubmit}>
            SUBMIT
          </RoundedRect>
          {guide.map(g => (
            <div className={guideStyle} key={`guide_${g.get('title')}`}>
              <h3 className="GuideHeader">{g.get('title')}</h3>
              <div className="GuideContent" dangerouslySetInnerHTML={{ __html: g.get('renderedBody') }} />
            </div>
          ))}
        </div>
      </div>
      <h2 className={titleStyle}>Submissions</h2>
    </article>
    They go here
  </div>
)
ArtistInviteDetail.propTypes = {
  closedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dpi: PropTypes.string.isRequired,
  guide: PropTypes.object.isRequired,
  headerImage: PropTypes.object.isRequired,
  inviteType: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  logoImage: PropTypes.object.isRequired,
  openedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  submissionBodyBlock: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
ArtistInviteDetail.contextTypes = {
  onClickScrollToContent: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
}

