import DiscoverContainer from '../../containers/DiscoverContainer'

const TYPES = [
  // 'communities',
  // 'featured-users',
  'recent',
  'trending',
]

const getComponents = (location, cb) => {
  cb(null, DiscoverContainer)
}

const indexRoute = {
  getComponents,
}

const explore = store => ({
  path: '/explore(/:type)',
  getComponents,
  onEnter: (nextState, replace) => {
    const { params: { type } } = nextState
    const { authentication } = store.getState()
    const rootPath = authentication.isLoggedIn ? '/discover' : '/'

    if (!type || TYPES.indexOf(type) === -1) {
      replace({ state: nextState, pathname: rootPath })
    } else {
      replace({ state: nextState, pathname: `/discover/${type}` })
    }
  },
})

const discover = store => ({
  path: 'discover(/:type)',
  getComponents,
  onEnter: (nextState, replace) => {
    const type = nextState.params.type
    const { authentication } = store.getState()
    const rootPath = authentication.isLoggedIn ? '/discover' : '/'

    // redirect back to root path if type is unrecognized
    // or, if a logged out user is visiting /discover, redirect to /
    if ((type && TYPES.indexOf(type) === -1) || (!type && !authentication.isLoggedIn)) {
      replace({ state: nextState, pathname: rootPath })
    }
  },
})

export {
  indexRoute,
  getComponents,
  discover,
  explore,
}

export default [
  discover,
  explore,
]
