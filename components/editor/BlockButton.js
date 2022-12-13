import React from 'react'
import { useSlate } from 'slate-react'

import cn from 'clsx'
import {
  isBlockActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
} from '../../utils/editor'

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
        isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        ) && 'active'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      {...Props}
    >
      {icon || 'i'}
    </button>
  )
}

export default BlockButton
