import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _pick from 'lodash/pick'

import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'
import Spinner from '../ui/Spinner'

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

  onSubmit = formValues => {
    const { stream, editStream } = this.props
    editStream(stream.id, formValues)
  }

  render() {
    const { stream, userId: currentUserId } = this.props
    return (
      <div>
        <h3>Edit Stream</h3>
        {!stream || !currentUserId ? (
          <Spinner>Loading</Spinner>
        ) : stream.userId === currentUserId ? (
          <StreamForm
            onSubmit={this.onSubmit}
            initialValues={_pick(stream, 'title', 'description')}
            buttonText="Save"
          />
        ) : (
          'You are not authorized to edit this stream.'
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
