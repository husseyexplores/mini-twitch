import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { signIn, signOut } from '../actions'
import { GoogleAuthClientId } from '../secret'

class GoogleAuth extends Component {
  state = {
    isSignedIn: null,
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: GoogleAuthClientId,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          // TODO: dipatch the following
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId()
      this.props.signIn(userId)
    } else {
      this.props.signOut()
    }
  }

  handleSignInClick = () => {
    this.auth.signIn()
  }
  handleSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    const { isSignedIn } = this.props

    return isSignedIn === null ? (
      <div>Loading....</div>
    ) : isSignedIn ? (
      <button
        className="ui red google button"
        onClick={this.handleSignOutClick}
      >
        <i className="google icon" />
        Sign out
      </button>
    ) : (
      <button className="ui red google button" onClick={this.handleSignInClick}>
        <i className="google icon" />
        Sign in with Google
      </button>
    )
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

GoogleAuth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: userId => dispatch(signIn(userId)),
    signOut: () => dispatch(signOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth)
