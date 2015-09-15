import * as ACTION_TYPES from '../../src/constants/action_types'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

function getAuthToken() {
  return {
    'Authorization': `Bearer ${localStorage.getItem('ello_access_token')}`,
  }
}

function getPostJsonHeader() {
  return {
    ...getAuthToken(),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

function getGetHeader() {
  return getAuthToken()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function parseJSON(response) {
  // 200 means we have a body otherwise it's a 200+ with an empty body
  return (response.status === 200) ? response.json() : response
}

export function requester() {
  return next => action => {
    const { payload, type, meta } = action

    if ((type !== ACTION_TYPES.LOAD_STREAM &&
         type !== ACTION_TYPES.POST_JSON &&
         type !== ACTION_TYPES.POST_FORM
        ) || !payload) {
      return next(action)
    }

    const { endpoint, method, body } = payload

    if (!endpoint) return next(action);

    const SUCCESS = type + '_SUCCESS'
    const REQUEST = type + '_REQUEST'
    const FAILURE = type + '_FAILURE'

    // dispatch the start of the request
    next({ type: REQUEST, payload, meta: meta })

    return fetch(endpoint, {
      method: method || 'GET',
      body: body || null,
      headers: (method) ? getPostJsonHeader() : getGetHeader(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(response => {
        payload.response = camelizeKeys(response)
        next({ meta, payload, type: SUCCESS })
        return true
      })
      .catch(error => {
        next({ error, meta, payload, type: FAILURE })
        return false
      })
  }
}

