import React from 'react'
import { useSlate } from 'slate-react'
import cn from 'clsx'

import CustomEditor from '../../../utils/editor'

const BlockButton = ({
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
        CustomEditor.isBlockActive(editor, format) && 'active'
      )}
      onMouseDown={event => {
        event.preventDefault()
        CustomEditor.toggleBlock(editor, format)
      }}
      {...Props}
    >
      {icon || 'i'}
    </button>
  )
}

export default BlockButton
