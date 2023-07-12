import React from 'react'

const Button = ({
    onClickHandler,
    name
}) => {
  return (
    <button className='blur-btn' onClick={onClickHandler}>
        {name}
    </button>
  )
}

export default Button