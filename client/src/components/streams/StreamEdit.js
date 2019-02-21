import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _curry from 'lodash/fp/curry'

import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends Component {
  componentDidMount() {
    const {
      stream,
      fetchStream,
      match: {
        params: { streamId },
      },
    } = this.props

    if (!stream) {
      fetchStream(streamId)
    }
  }

  render() {
    const { editStream, stream, userId } = this.props

    return (
      <div>
        <h3>Edit Stream</h3>
        {stream && userId ? (
          <StreamForm
            onSubmit={_curry(editStream)(stream.id)}
            userId={userId}
            initialValues={stream}
          />
        ) : (
          'Loading Edit Form...'
        )}
      </div>
    )
  }
}

StreamEdit.propTypes = {
  userId: PropTypes.string,
  fetchStream: PropTypes.func.isRequired,
  editStream: PropTypes.func.isRequired,
  stream: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      streamId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.streamId],
    userId: state.auth.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editStream: (streamId, formValues) =>
      dispatch(editStream(streamId, formValues)),
    fetchStream: streamId => dispatch(fetchStream(streamId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamEdit)
