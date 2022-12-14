import React from 'react'
import dynamic from 'next/dynamic'
import { Editable } from 'slate-react'
import isHotkey from 'is-hotkey'

import { toggleMark } from '../utils/editor'
import Element from './editor/Element'
import Leaf from './editor/Leaf'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const ResumeEditor = ({ editor }) => {
  const handleKeyDown = event => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  return (
    <Editable
      autoFocus
      renderElement={Element}
      renderLeaf={Leaf}
      onKeyDown={handleKeyDown}
      className='resume-editor h-[800px]'
    />
  )
}

// export default dynamic(() => Promise.resolve(ResumeEditor), { ssr: false })
export default ResumeEditor
