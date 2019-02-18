import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import GoogleAuth from './GoogleAuth'

function Header() {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
