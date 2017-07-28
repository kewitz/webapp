import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { ARTIST_INVITES, ARTIST_INVITE_SUBMISSIONS } from 'ello-brains/constants/mapping_types'
import { artistInvites as artistInvitesApi, artistInviteDetail } from '../networking/api'
import { artistInvites as artistInvitesRenderable, artistInviteSubmissionsAsGrid } from '../components/streams/StreamRenderables'

export const loadArtistInvites = isPreview => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: artistInvitesApi(isPreview) },
    meta: {
      mappingType: ARTIST_INVITES,
      renderStream: {
        asList: artistInvitesRenderable,
        asGrid: artistInvitesRenderable,
      },
    },
  }
)

export const loadArtistInviteDetail = slug => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: artistInviteDetail(slug) },
    meta: {
      mappingType: ARTIST_INVITES,
    },
  }
)

export const loadArtistInviteSubmissions = (path, key) => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: { path } },
    meta: {
      mappingType: ARTIST_INVITE_SUBMISSIONS,
      renderStream: {
        asList: artistInviteSubmissionsAsGrid,
        asGrid: artistInviteSubmissionsAsGrid,
      },
      resultKey: key,
    },
  }
)

export const sendAdminAction = action => (
  {
    type: LOAD_STREAM,
    meta: {
      mappingType: ARTIST_INVITE_SUBMISSIONS,
      updateResult: false,
    },
    payload: {
      body: action.get('body').toJS(),
      endpoint: { path: action.get('href') },
      method: action.get('method'),
    },
  }
)

