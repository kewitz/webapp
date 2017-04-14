/* eslint-disable no-constant-condition */
import { actionChannel, fork, put, select, take } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import get from 'lodash/get'
import { isElloAndroid } from '../lib/jello'
import * as ACTION_TYPES from '../constants/action_types'
import { RELATIONSHIP_PRIORITY } from '../constants/relationship_types'
import { trackEvent as trackEventAction } from '../actions/analytics'
import { selectActiveNotificationsType } from '../selectors/gui'
import { selectProfileIsFeatured } from '../selectors/profile'

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
    const isFeatured = yield select(selectProfileIsFeatured)
    switch (action.type) {
      case ACTION_TYPES.ALERT.OPEN:
      case ACTION_TYPES.MODAL.OPEN:
        if (get(action, 'payload.trackLabel')) {
          return yield put(trackEventAction(get(action, 'payload.trackLabel')))
        }
        break
      case ACTION_TYPES.COMMENT.CREATE_REQUEST:
        return yield put(trackEventAction('published_comment'))
      case ACTION_TYPES.COMMENT.DELETE_REQUEST:
        return yield put(trackEventAction('deleted_comment'))
      case ACTION_TYPES.OMNIBAR.OPEN:
        return yield put(trackEventAction('opened_omnibar'))
      case ACTION_TYPES.POST.CREATE_REQUEST:
        if (get(action, 'payload.body.body[0].link_url', '').length) {
          yield put(trackEventAction('added_buy_button'))
        }
        return yield put(trackEventAction(get(action, 'meta.repostId') ? 'published_repost' : 'published_post', { isFeatured }))
      case ACTION_TYPES.POST.DELETE_REQUEST:
        return yield put(trackEventAction('deleted_post'))
      case ACTION_TYPES.POST.LOVE_REQUEST:
        if (method === 'POST') {
          return yield put(trackEventAction('web_production.post_actions_love'))
        }
        break
      case ACTION_TYPES.POST.WATCH_REQUEST:
        if (method === 'DELETE') {
          return yield put(trackEventAction('unwatched-post'))
        }
        return yield put(trackEventAction('watched-post'))
      case ACTION_TYPES.POST.UPDATE_REQUEST:
        return yield put(trackEventAction('edited_post'))
      case ACTION_TYPES.PROFILE.DELETE_REQUEST:
        return yield put(trackEventAction('user-deleted-account'))
      case ACTION_TYPES.PROFILE.FOLLOW_CATEGORIES_REQUEST:
        return yield put(trackEventAction('Onboarding.Settings.Categories.Completed',
          { categories: get(action, 'payload.body.followed_category_ids', []).length },
        ))
      case ACTION_TYPES.PROFILE.SIGNUP_SUCCESS:
        return yield put(trackEventAction('join-successful'))
      case ACTION_TYPES.RELATIONSHIPS.UPDATE_INTERNAL:
      case ACTION_TYPES.RELATIONSHIPS.UPDATE_REQUEST:
        switch (get(action, 'payload.priority')) {
          case RELATIONSHIP_PRIORITY.FRIEND:
          case RELATIONSHIP_PRIORITY.NOISE:
            return yield put(trackEventAction('followed_user'))
          case RELATIONSHIP_PRIORITY.INACTIVE:
          case RELATIONSHIP_PRIORITY.NONE:
            return yield put(trackEventAction('unfollowed_user'))
          case RELATIONSHIP_PRIORITY.BLOCK:
            return yield put(trackEventAction('blocked_user'))
          case RELATIONSHIP_PRIORITY.MUTE:
            return yield put(trackEventAction('muted_user'))
          default:
            break
        }
        break
      case ACTION_TYPES.USER.COLLAB_WITH_REQUEST:
        return yield put(trackEventAction('send-collab-dialog-profile'))
      case ACTION_TYPES.USER.HIRE_ME_REQUEST:
        return yield put(trackEventAction('send-hire-dialog-profile'))
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

