import React from 'react'
import dynamic from 'next/dynamic'
import { Editable as SlateEditable } from 'slate-react'
import { Range, Transforms } from 'slate'
import isHotkey, { isKeyHotkey } from 'is-hotkey'

import Leaf from '../Leaf'
import Element from '../Element'
import CustomEditor, { EXECUTE_COMMAND } from '../../../utils/editor'

const Editable = ({ editor }) => {
  const handleKeyDown = event => {
    const { selection } = editor
    const isLinkActive = CustomEditor.isLinkActive(editor)

    // For link's cursor movement
    if (selection && isLinkActive && Range.isCollapsed(selection)) {
      const { nativeEvent } = event
      if (isKeyHotkey('left', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset', reverse: true })
        return
      }
      if (isKeyHotkey('right', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset' })
        return
      }
    }

    for (const hotkey in EXECUTE_COMMAND) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        EXECUTE_COMMAND[hotkey](editor)
      }
    }
  }

  return (
    <SlateEditable
      renderLeaf={Leaf}
      renderElement={Element}
      autoFocus
      spellCheck
      onKeyDown={handleKeyDown}
      className='bg-white p-6 rounded-md border min-h-screen'
    />
  )
}

export default dynamic(() => Promise.resolve(Editable), { ssr: false })
