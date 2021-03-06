import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {
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
    const { onSubmit } = this.props
    onSubmit(formValues)
  }

  render() {
    const { buttonText = 'Submit' } = this.props

    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <h3>StreamForm</h3>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">{buttonText}</button>
      </form>
    )
  }
}

StreamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
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

export default reduxForm({
  form: 'streamForm',
  validate: validate,
})(StreamForm)
