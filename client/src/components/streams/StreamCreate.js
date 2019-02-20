import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _curry from 'lodash/curry'

import { createStream } from '../../actions/'
import StreamForm from './StreamForm'

class StreamCreate extends Component {
  render() {
    const { userId, createStream } = this.props
    if (userId) window.__zz = _curry(createStream)(userId.id)

    return (
      <div>
        <h3>Create Stream</h3>
        {userId ? (
          <StreamForm
            onSubmit={_curry(createStream)(userId.id)}
            userId={userId}
          />
        ) : (
          'Loading Create Form...'
        )}
      </div>
    )
  }
}

StreamCreate.propTypes = {
  userId: PropTypes.string,
  createStream: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createStream: (userId, formValues) =>
      dispatch(createStream(userId, formValues)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamCreate)
