import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { ARTIST_INVITES } from 'ello-brains/constants/mapping_types'
import { artistInvites as artistInvitesApi } from '../networking/api'
import { artistInvites as artistInvitesRenderable } from '../components/streams/StreamRenderables'

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

export const loadArtistInviteSubmissions = () => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: artistInvitesApi() },
  }
)

