import { POST } from '../constants/action_types'

export function editor(state = {}, action) {
  switch (action.type) {
    case POST.CREATE_SUCCESS:
      return {}
    case POST.TMP_IMAGE_CREATED:
      return {
        ...state,
        type: action.type,
        ...action.payload,
      }
    case POST.IMAGE_BLOCK_CREATED:
      return {
        ...state,
        type: action.type,
        ...action.payload,
      }
    case POST.POST_PREVIEW_SUCCESS:
    case POST.SAVE_IMAGE_SUCCESS:
      return {
        ...state,
        type: action.type,
        ...action.payload.response,
      }
    default:
      return state
  }
}

