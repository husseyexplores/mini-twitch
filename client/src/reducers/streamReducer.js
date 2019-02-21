import _omit from 'lodash/fp/omit'
import _mapKeys from 'lodash/mapKeys'
import {
  STREAM_CREATE,
  STREAM_EDIT,
  STREAM_DELETE,
  STREAM_FETCH,
  STREAMS_FETCH,
} from '../actions/types'

export default function streamReducer(state = {}, { type, payload }) {
  switch (type) {
    case STREAM_CREATE:
    case STREAM_EDIT:
    case STREAM_FETCH:
      return { ...state, [payload.id]: payload }

    case STREAM_DELETE:
      return _omit(state, payload.id)

    case STREAMS_FETCH:
      return { ...state, ..._mapKeys(payload, 'id') }

    default:
      return state
  }
}
