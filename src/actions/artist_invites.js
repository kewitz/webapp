import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { ARTIST_INVITES } from 'ello-brains/constants/mapping_types'
import { artistInvites as artistInvitesApi, artistInviteDetail } from '../networking/api'
import { artistInvites as artistInvitesRenderable, postsAsGrid } from '../components/streams/StreamRenderables'
import * as StreamFilters from '../components/streams/StreamFilters'

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
      mappingType: 'artistInviteSubmissions',
      resultFilter: StreamFilters.postsFromSubmissions,
      renderStream: {
        asList: postsAsGrid,
        asGrid: postsAsGrid,
      },
      resultKey: key,
    },
  }
)

