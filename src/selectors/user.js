import Immutable from 'immutable'
import { createSelector } from 'reselect'
import get from 'lodash/get'
import trunc from 'trunc-html'
import { selectParamsUsername } from './params'
import { selectJson } from './store'
import { USERS } from '../constants/mapping_types'
import { findModel } from '../helpers/json_helper'

// props.user.xxx
export const selectPropsUser = (state, props) => get(props, 'user')
export const selectPropsUserId = (state, props) => get(props, 'userId') || get(props, 'user').get('id')

// state.json.users.xxx
export const selectUsers = state => state.json.get(USERS, Immutable.Map())

// Memoized selectors
export const selectUser = createSelector(
  [selectUsers, selectPropsUserId], (users, userId) =>
    users.get(`${userId}`, Immutable.Map()),
)

export const selectUserFromPropsUserId = createSelector(
  [selectJson, selectPropsUserId], (json, userId) =>
    json.getIn([USERS, userId], null),
)

export const selectUserFromUsername = createSelector(
  [selectJson, selectParamsUsername], (json, username) =>
    findModel(json, { collection: USERS, findObj: { username } }) || Immutable.Map(),
)

export const selectRelationshipPriority = createSelector(
  [selectUser], user => user.get('relationshipPriority'),
)

export const selectTruncatedShortBio = createSelector(
  [selectUserFromPropsUserId], user =>
    trunc(user ? user.get('formattedShortBio') || '' : '', 160, { sanitizer:
      { allowedAttributes: { img: ['align', 'alt', 'class', 'height', 'src', 'width'] } },
    }),
)

export const selectUserMetaAttributes = createSelector(
  [selectUserFromUsername], user => user.get('metaAttributes', Immutable.Map()),
)

export const selectUserMetaDescription = createSelector(
  [selectUserMetaAttributes], metaAttributes => metaAttributes.get('description'),
)

export const selectUserMetaImage = createSelector(
  [selectUserMetaAttributes], metaAttributes => metaAttributes.get('image'),
)

export const selectUserMetaRobots = createSelector(
  [selectUserMetaAttributes], metaAttributes => metaAttributes.get('robots'),
)

export const selectUserMetaTitle = createSelector(
  [selectUserMetaAttributes], metaAttributes => metaAttributes.get('title'),
)

