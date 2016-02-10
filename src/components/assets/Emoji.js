import React, { PropTypes } from 'react'
import classNames from 'classnames'

// TODO: The path needs to be the emoji server and not static here
const Emoji = (props) => {
  const { alt, className, name = 'ello', size = 20, src, title, width, height } = props
  const tip = name.replace(/_|-/, ' ')
  return (
    <img
      { ...props }
      alt={ alt || tip }
      className={ classNames(className, 'Emoji') }
      src={ src || `/static/images/support/${name}.png` }
      title={ title || tip }
      width={ width || size }
      height={ height || size }
      size={ null }
      name={ null }
    />
  )
}

Emoji.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  src: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Emoji
