import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Mini Twitch
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
