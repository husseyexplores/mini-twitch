import React from 'react'
import PropTypes from 'prop-types'

export default function Spinner({
  center = true,
  inline = false,
  size = 4,
  children: text,
}) {
  const sizeClass = {
    0: 'mini',
    1: 'tiny',
    2: 'small',
    3: 'medium',
    4: 'large',
    5: 'big',
    6: 'huge',
    7: 'massive',
  }[size]

  let classes = 'ui active loader ' + sizeClass

  if (center) classes += ' centered'
  if (inline) classes += ' inline'
  if (text) classes += ' text'

  return <div className={classes}>{text}</div>
}

Spinner.propTypes = {
  center: PropTypes.bool,
  inline: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.string,
}
