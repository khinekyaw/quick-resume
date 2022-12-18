import React from 'react'
import cn from 'clsx'

import s from './ToolButton.module.css'

const ToolButton = ({ icon, activeIcon, active, className, ...rest }) => {
  return (
    <button className={cn(className, s.root, active && s.active)} {...rest}>
      {activeIcon && active ? activeIcon : icon}
    </button>
  )
}

export default ToolButton
