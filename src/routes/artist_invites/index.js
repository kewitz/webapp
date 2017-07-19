import ArtistInvitesPage from '../../pages/ArtistInvitesPage'

export default {
  path: 'artist-invites(/:type)',
  getComponents(location, cb) {
    cb(null, ArtistInvitesPage)
  },
}

