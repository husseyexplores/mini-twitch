import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createStream } from '../../actions/'
import StreamForm from './StreamForm'
import Spinner from '../ui/Spinner'

class StreamCreate extends Component {
  onSubmit = formValues => {
    const { userId, createStream } = this.props
    createStream(userId, formValues)
  }

  render() {
    const { userId } = this.props

    return (
      <div>
        <h3>Create Stream</h3>
        {userId ? (
          <StreamForm onSubmit={this.onSubmit} />
        ) : (
          <Spinner>Loading</Spinner>
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
