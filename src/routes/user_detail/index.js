import UserDetailContainer from '../../containers/UserDetailContainer'
import LoveGalleryContainer from '../../containers/LoveGalleryContainer'

const TYPES = [
  'following',
  'followers',
  'loves',
]

export default [
  {
    path: ':username/loves/gallery',
    getComponents(location, cb) {
      cb(null, LoveGalleryContainer)
    },
    onEnter(nextState, replace) {
      const type = nextState.params.type
      if (/[A-Z]/.test(nextState.params.username)) {
        const userPath = `${nextState.params.username}/loves/gallery`
        replace({ pathname: `/${userPath.toLowerCase()}`, state: nextState })
      }
    },
  },
  // {
  //   path: ':username/gallery',
  //   getComponents(location, cb) {
  //     cb(null, GalleryProfileContainer)
  //   },
  //   onEnter(nextState, replace) {
  //     const type = nextState.params.type
  //     if (/[A-Z]/.test(nextState.params.username)) {
  //       const userPath = `${nextState.params.username}/gallery`
  //       replace({ pathname: `/${userPath.toLowerCase()}`, state: nextState })
  //     }
  //   },
  // },
  {
    path: ':username(/:type)',
    getComponents(location, cb) {
      cb(null, UserDetailContainer)
    },
    onEnter(nextState, replace) {
      const type = nextState.params.type
      // redirect back to /username if type is unrecognized
      if (type && TYPES.indexOf(type) === -1) {
        replace({ pathname: `/${nextState.params.username.toLowerCase()}`, state: nextState })
      } else if (/[A-Z]/.test(nextState.params.username)) {
        const userPath = type ? `${nextState.params.username}/${type}` : nextState.params.username
        replace({ pathname: `/${userPath.toLowerCase()}`, state: nextState })
      }
    },
  },
]

