import history from '../history'

import streamsAPI from '../apis/streams'
import {
  SIGN_IN,
  SIGN_OUT,
  STREAM_CREATE,
  STREAM_EDIT,
  STREAM_DELETE,
  STREAM_FETCH,
  STREAMS_FETCH,
} from './types'

export function signIn(userId) {
  return {
    type: SIGN_IN,
    payload: userId,
  }
}

export function signOut() {
  return {
    type: SIGN_OUT,
  }
}

export function fetchStreams() {
  return async dispatch => {
    const response = await streamsAPI.get('/streams')
    dispatch({
      type: STREAMS_FETCH,
      payload: response.data,
    })
  }
}

export function fetchStream(id) {
  return async dispatch => {
    const response = await streamsAPI.get(`/streams/${id}`)
    dispatch({
      type: STREAM_FETCH,
      payload: response.data,
    })
  }
}

export function createStream(userId, formValues) {
  return async dispatch => {
    const response = await streamsAPI.post('/streams', {
      ...formValues,
      userId,
    })
    dispatch({
      type: STREAM_CREATE,
      payload: { ...response.data, userId },
    })
    // navigate back to streams list page
    history.push('/')
  }
}

export function editStream(id, formValues) {
  return async dispatch => {
    const response = await streamsAPI.patch(`/streams/${id}`, formValues)
    dispatch({
      type: STREAM_EDIT,
      payload: response.data,
    })
    // navigate back to streams list page
    history.push('/')
  }
}

export function deleteStream(id) {
  return async dispatch => {
    await streamsAPI.delete(`/streams/${id}`)
    dispatch({
      type: STREAM_DELETE,
      payload: id,
    })
  }
}
