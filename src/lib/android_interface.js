import { isElloAndroid } from './jello'
import store from '../store'

const getJSState = () => {
  const jsState = {}
  const state = store.getState()
  Object.keys(state).forEach((key) => {
    // whitelist the parts of state we care about here since
    // sending the whole thing can result in memory issues
    if (['authentication', 'editor', 'profile'].some(wlKey => key === wlKey)) {
      jsState[key] = state[key].toJS()
    }
  })
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
