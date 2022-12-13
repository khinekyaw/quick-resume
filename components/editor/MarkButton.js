import React from 'react'
import { useSlate } from 'slate-react'

import cn from 'clsx'
import { isMarkActive, toggleMark } from '../../utils/editor'

const MarkButton = ({
  format,
  icon,
  active,
  className,
  onMouseDown,
  ...Props
}) => {
  const editor = useSlate()

  return (
    <button
      className={cn(
        className,
        'icon-checkbox',
        isMarkActive(editor, format) && 'active'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      {...Props}
    >
      {icon || 'i'}
    </button>
  )
}

export default MarkButton
