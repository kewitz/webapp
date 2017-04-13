/* eslint-disable no-constant-condition */
import { actionChannel, fork, put, select, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import get from 'lodash/get'
import { isElloAndroid } from '../lib/jello'
import * as ACTION_TYPES from '../constants/action_types'
import { trackEvent as trackEventAction } from '../actions/analytics'
import { selectActiveNotificationsType } from '../selectors/gui'

let shouldCallInitialTrackPage = false
const agent = isElloAndroid() ? 'android' : 'webapp'

const pageTrackTypes = [
  ACTION_TYPES.GUI.NOTIFICATIONS_TAB,
  ACTION_TYPES.GUI.TOGGLE_NOTIFICATIONS,
  ACTION_TYPES.LOAD_NEXT_CONTENT_REQUEST,
  ACTION_TYPES.TRACK.INITIAL_PAGE,
  LOCATION_CHANGE,
]

function* trackEvent() {
  while (true) {
    const action = yield take(ACTION_TYPES.TRACK.EVENT)
    const { label, options } = action.payload
    if (window.analytics) {
      window.analytics.track(label, { agent, ...options })
    }
  }
}

function* trackEvents() {
  while (true) {
    const action = yield take('*')
    const method = get(action, 'payload.method')
    switch (action.type) {
      case ACTION_TYPES.COMMENT.CREATE_REQUEST:
        put(trackEventAction('published_comment'))
        break
      case ACTION_TYPES.COMMENT.DELETE_REQUEST:
        put(trackEventAction('deleted_comment'))
        break
      case ACTION_TYPES.POST.DELETE_REQUEST:
        put(trackEventAction('deleted_post'))
        break
      case ACTION_TYPES.POST.LOVE_REQUEST:
        if (method === 'POST') {
          put(trackEventAction('web_production.post_actions_love'))
        }
        break
      case ACTION_TYPES.POST.WATCH_REQUEST:
        if (method === 'DELETE') {
          put(trackEventAction('unwatched-post'))
          break
        }
        put(trackEventAction('watched-post'))
        break
      case ACTION_TYPES.POST.UPDATE_REQUEST:
        put(trackEventAction('edited_post'))
        break
      case ACTION_TYPES.PROFILE.DELETE_REQUEST:
        put(trackEventAction('user-deleted-account'))
        break
      case ACTION_TYPES.PROFILE.SIGNUP_SUCCESS:
        put(trackEventAction('join-successful'))
        break
      default:
        break
    }
  }
}

function* trackPage(pageTrackChannel) {
  while (true) {
    const action = yield take(pageTrackChannel)
    const pageProps = { agent }
    if ((action.type === ACTION_TYPES.LOCATION_CHANGE ||
      action.type === ACTION_TYPES.TRACK.INITIAL_PAGE) && window.analytics) {
      shouldCallInitialTrackPage = true
    }
    if (action.type === ACTION_TYPES.GUI.NOTIFICATIONS_TAB) {
      pageProps.path = `/notifications/${get(action, 'payload.activeTabType', '')}`
    } else if (action.type === ACTION_TYPES.GUI.TOGGLE_NOTIFICATIONS) {
      const lastTabType = yield select(selectActiveNotificationsType)
      pageProps.path = `/notifications/${lastTabType === 'all' ? '' : lastTabType}`
    }
    if (shouldCallInitialTrackPage) {
      window.analytics.page(pageProps)
    }
  }
}

export default function* analytics() {
  const pageTrackChannel = yield actionChannel(pageTrackTypes)
  yield [
    fork(trackEvent),
    fork(trackEvents),
    fork(trackPage, pageTrackChannel),
  ]
}

