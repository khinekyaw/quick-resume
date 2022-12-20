import React from 'react'
import cn from 'clsx'

const Button = ({
  icon,
  active,
  className,
  ...Props
}) => {

  return (
    <button
      className={cn(
        className,
        'icon-checkbox',
        active && 'active'
      )}
      {...Props}
    >
      {icon || 'i'}
    </button>
  )
}

export default Button
