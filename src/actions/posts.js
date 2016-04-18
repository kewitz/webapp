import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'
import * as StreamRenderables from '../components/streams/StreamRenderables'

export function loadPostDetail(idOrToken) {
  return {
    type: ACTION_TYPES.POST.DETAIL,
    payload: {
      endpoint: api.postDetail(idOrToken),
      postIdOrToken: idOrToken,
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      updateResult: false,
    },
  }
}

export function loadEditablePost(idOrToken) {
  return {
    type: ACTION_TYPES.POST.EDITABLE,
    payload: { endpoint: api.editPostDetail(idOrToken) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      updateResult: false,
    },
  }
}

// commentsAsList needs the "parent post" so that the correct editor is referenced when replying to
// a comment.
export function loadComments(post, addUpdateKey = true) {
  const postId = `${post.id}`
  const obj = {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.commentsForPost(postId),
      postIdOrToken: postId,
    },
    meta: {
      mappingType: MAPPING_TYPES.COMMENTS,
      renderStream: {
        asList: StreamRenderables.commentsAsList(post),
        asGrid: StreamRenderables.commentsAsList(post),
      },
      resultKey: `/posts/${postId}/comments`,
    },
  }
  if (addUpdateKey) {
    obj.meta.updateKey = `/posts/${postId}/`
  }
  return obj
}

export function toggleComments(post, showComments) {
  return {
    type: ACTION_TYPES.POST.TOGGLE_COMMENTS,
    payload: {
      model: post,
      showComments,
    },
  }
}

export function toggleEditing(post, isEditing) {
  return {
    type: ACTION_TYPES.POST.TOGGLE_EDITING,
    payload: {
      model: post,
      isEditing,
    },
  }
}

export function toggleLovers(post, showLovers) {
  return {
    type: ACTION_TYPES.POST.TOGGLE_LOVERS,
    payload: {
      model: post,
      showLovers,
    },
  }
}

export function toggleReposters(post, showReposters) {
  return {
    type: ACTION_TYPES.POST.TOGGLE_REPOSTERS,
    payload: {
      model: post,
      showReposters,
    },
  }
}

export function toggleReposting(post, isReposting) {
  return {
    type: ACTION_TYPES.POST.TOGGLE_REPOSTING,
    payload: {
      model: post,
      isReposting,
    },
  }
}

export function lovePost(post) {
  return {
    type: ACTION_TYPES.POST.LOVE,
    payload: {
      endpoint: api.lovePost(post.id),
      method: 'POST',
      model: post,
    },
    meta: {
      mappingType: MAPPING_TYPES.LOVES,
      resultKey: `/posts/${post.id}/love`,
      updateKey: `/posts/${post.id}/`,
    },
  }
}

export function unlovePost(post) {
  return {
    type: ACTION_TYPES.POST.LOVE,
    payload: {
      endpoint: api.unlovePost(post.id),
      method: 'DELETE',
      model: post,
    },
    meta: {
      resultKey: `/posts/${post.id}/love`,
      updateKey: `/posts/${post.id}/`,
    },
  }
}

export function deletePost(post) {
  return {
    type: ACTION_TYPES.POST.DELETE,
    payload: {
      endpoint: api.deletePost(post.id),
      method: 'DELETE',
      model: post,
    },
    meta: {},
  }
}

export function flagPost(post, kind) {
  return {
    type: ACTION_TYPES.POST.FLAG,
    payload: {
      endpoint: api.flagPost(post.id, kind),
      method: 'POST',
    },
    meta: {},
  }
}

export function createPost(body, editorId, repostId, repostedFromId) {
  return {
    type: ACTION_TYPES.POST.CREATE,
    payload: {
      body: body.length ? { body } : null,
      editorId,
      endpoint: api.createPost(repostId),
      method: 'POST',
    },
    meta: {
      repostId,
      repostedFromId,
    },
  }
}

export function createComment(body, editorId, postId) {
  return {
    type: ACTION_TYPES.COMMENT.CREATE,
    payload: {
      body: { body },
      editorId,
      endpoint: api.createComment(postId),
      method: 'POST',
      postId,
    },
    meta: {},
  }
}

export function updatePost(post, body) {
  return {
    type: ACTION_TYPES.POST.UPDATE,
    payload: {
      body: { body },
      endpoint: api.updatePost(post.id),
      method: 'PATCH',
      model: post,
    },
    meta: {},
  }
}

export function uploadAsset(type, file, editorId, index) {
  return {
    type,
    meta: {},
    payload: {
      editorId,
      file,
      index,
    },
  }
}

export function temporaryPostImageCreated(objectURL, editorId, index) {
  return {
    type: ACTION_TYPES.POST.TMP_IMAGE_CREATED,
    meta: {},
    payload: {
      url: objectURL,
      editorId,
      index,
    },
  }
}

export function savePostImage(file, editorId, index) {
  return dispatch => {
    dispatch(temporaryPostImageCreated(URL.createObjectURL(file), editorId, index))
    dispatch(uploadAsset(ACTION_TYPES.POST.SAVE_IMAGE, file, editorId, index))
  }
}

export function postPreviews(embedUrl, editorId, index) {
  return {
    type: ACTION_TYPES.POST.POST_PREVIEW,
    payload: {
      body: { body: [{ kind: 'embed', data: { url: embedUrl } }] },
      editorId,
      endpoint: api.postPreviews(),
      index,
      method: 'POST',
    },
  }
}

export function autoCompleteUsers(type, word) {
  return {
    type: ACTION_TYPES.POST.AUTO_COMPLETE,
    payload: {
      endpoint: api.userAutocompleter(word),
      type,
    },
  }
}

export function loadEmojis(type, word) {
  return {
    type: ACTION_TYPES.EMOJI.LOAD,
    payload: {
      endpoint: api.loadEmojis(),
      type,
      word,
    },
  }
}

