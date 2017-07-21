/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router'
import { before, css, media, modifier, select } from '../../styles/jss'
import * as s from '../../styles/jso'
import BackgroundImage from '../assets/BackgroundImage'

const containerStyle = css(
  s.sansRegular,
  s.fontSize14,
  s.fullWidth,
  s.mb10,
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
)

const imageContainerStyle = css(
  s.relative,
  { height: 235 },
  media(s.minBreak2, { height: 220 }),
)

const contentContainerStyle = css(
  { backgroundColor: '#f2f2f2', height: 250 },
  s.p10,
  s.relative,
  media(s.minBreak3, s.py30, s.px20),
  select('> p', s.my0),
)

const titleStyle = css(
  s.sansBlack,
  s.fontSize24,
  s.truncate,
  media(s.minBreak3, s.mb20),
)

const inviteTypeStyle = css(
  s.colorA,
  s.truncate,
)

const statusStyle = css(
  s.mt20,
  modifier('.open', { color: '#00d100' }),
  before({ borderRadius: 5, content: '""', height: 10, width: 10 }, s.inlineBlock, s.mr20),
  before(modifier('.open'), s.bgcGreen),
  media(s.minBreak3, s.absolute, s.mt0, { right: 20, top: 85 }),
)

const dateRangeStyle = css(
  s.colorA,
  s.truncate,
  media(s.minBreak3, s.absolute, { right: 20, top: 105 }),
)

const shortDescriptionStyle = css(
  media(s.minBreak3, s.mt40),
)

const renderStatus = (status) => {
  let statusText
  switch (status) {
    case 'open':
      statusText = 'Open For Submissions'
      break
    default:
      statusText = 'Preview'
      break
  }
  return (
    <div className={`${statusStyle} ${status}`}>
      {statusText}
    </div>
  )
}

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
  <Link to={`/artist-invites/${slug}`} className={containerStyle}>
    <article>
      <div className={imageContainerStyle}>
        <BackgroundImage dpi={dpi} sources={logoImage} />
        <BackgroundImage dpi={dpi} sources={headerImage} />
      </div>
      <div className={contentContainerStyle}>
        <h2 className={titleStyle}>{`${title} - Plus Additional Text`}</h2>
        <p className={inviteTypeStyle}>{inviteType}</p>
        <p>{renderStatus(status)}</p>
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

export const ArtistInviteDetail = () => null

