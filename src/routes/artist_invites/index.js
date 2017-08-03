import ArtistInvitesPage from '../../pages/ArtistInvitesPage'
import ArtistInvitesDetailPage from '../../pages/ArtistInvitesDetailPage'

export default [
  {
    path: 'artist-invites',
    getComponents(location, cb) {
      cb(null, ArtistInvitesPage)
    },
  },
  {
    path: 'artist-invites/:slug',
    getComponents(location, cb) {
      cb(null, ArtistInvitesDetailPage)
    },
  },
]

