import { isElloAndroid } from './jello'

export const launchEditor = (jsState, post, isComment, comment) => {
  if (isElloAndroid() && typeof AndroidInterface.launchEditor === 'function') {
    AndroidInterface.launchEditor(jsState, post, isComment, comment)
  }
}
export const setIsStaff = (isStaff) => {
  if (isElloAndroid() && typeof AndroidInterface.setIsStaff === 'function') {
    AndroidInterface.setIsStaff(`${isStaff}`)
  }
}
export const supportsNativeEditor = () => isElloAndroid() && typeof AndroidInterface.launchEditor === 'function'
export const webAppLoaded = () => {
  if (isElloAndroid() && typeof AndroidInterface.webAppLoaded === 'function') {
    AndroidInterface.webAppLoaded()
  }
}
