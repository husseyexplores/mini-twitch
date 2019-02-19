import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createStream } from '../../actions/'

class StreamCreate extends Component {
  renderInput = ({ input, label, meta: { error, touched } }) => {
    const classNames = error && touched ? 'field error' : 'field'
    return (
      <div className={classNames}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {error && touched && this.renderError(error)}
      </div>
    )
  }

  renderError(error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.createStream(formValues)
  }

  render() {
    // const { isSignedIn, userId, createStream } = this.props
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <h3>StreamCreate</h3>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

StreamCreate.propTypes = {
  isSignedIn: PropTypes.bool,
  userId: PropTypes.string,
  createStream: PropTypes.func,
  handleSubmit: PropTypes.func,
}

function validate(formValues) {
  const errors = {}
  if (
    formValues.title &&
    formValues.title.length < 3 &&
    formValues.title.length > 0
  ) {
    errors.title = 'Title must contain at least 3 characters'
  }

  if (
    formValues.description &&
    formValues.description.length < 3 &&
    formValues.description.length > 0
  ) {
    errors.description = 'Description must contain at least 3 characters'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createStream: formValues => dispatch(createStream(formValues)),
  }
}

const withForm = reduxForm({
  form: 'STREAM/CREATE',
  validate: validate,
})(StreamCreate)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm)
