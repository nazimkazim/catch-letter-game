import React from 'react'

const Button = ({
    onClickHandler,
    name,
    icon,
    disabled
}) => {
  return (
    <button disabled={disabled} className='blur-btn' onClick={onClickHandler}>
        {icon && icon}
        {name && <span>{name}</span>}
    </button>
  )
}

export default Button
