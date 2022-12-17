import React from 'react'
import { useSlate } from 'slate-react'
import cn from 'clsx'

import CustomEditor from '../../../utils/editor'

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
        CustomEditor.isMarkActive(editor, format) && 'active'
      )}
      onMouseDown={event => {
        event.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
      {...Props}
    >
      {icon || 'i'}
    </button>
  )
}

export default MarkButton
