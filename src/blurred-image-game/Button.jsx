import React from 'react'

const Button = ({
    onClickHandler,
    name,
    icon
}) => {
  return (
    <button className='blur-btn' onClick={onClickHandler}>
        {icon && icon}
        {name && <span>{name}</span>}
    </button>
  )
}

export default Button
