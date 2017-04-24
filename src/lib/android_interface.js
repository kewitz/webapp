import { isElloAndroid } from './jello'
import store from '../store'
import { requestPushSubscription } from '../actions/profile'

const getJSState = () => {
  const jsState = {}
  const state = store.getState()
  Object.keys(state).forEach(key => (jsState[key] = state[key].toJS()))
  return JSON.stringify(jsState)
}
export const supportsNativeEditor = () => isElloAndroid() && typeof AndroidInterface.launchEditor === 'function'
export const supportsNativeImagePicker = () => isElloAndroid() && typeof AndroidInterface.launchImagePicker === 'function'
export const launchEditor = (post, isComment, comment) => {
  if (supportsNativeEditor()) {
    AndroidInterface.launchEditor(getJSState(), post, isComment, comment)
  }
}
export const launchImagePicker = (kind) => {
  if (supportsNativeImagePicker()) {
    AndroidInterface.launchImagePicker(getJSState(), kind)
  }
}
export const setIsStaff = (isStaff) => {
  if (isElloAndroid() && typeof AndroidInterface.setIsStaff === 'function') {
    AndroidInterface.setIsStaff(`${isStaff}`)
  }
}
export const webAppLoaded = () => {
  if (isElloAndroid() && typeof AndroidInterface.webAppLoaded === 'function') {
    AndroidInterface.webAppLoaded()
  }
}
export const exposeAndroidMethods = (dispatch) => {
  if (isElloAndroid()) {
    window.registerAndroidNotifications = (regId, bundleId, marketingVersion, buildVersion) => {
      dispatch(requestPushSubscription(regId, bundleId, marketingVersion, buildVersion))
    }
  }
}
export const initialize = (dispatch, isStaff) => {
  setIsStaff(isStaff)
  webAppLoaded()
  exposeAndroidMethods(dispatch)
}
