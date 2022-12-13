import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'
import { Editable, useSlate } from 'slate-react'
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

const ResumeEditor = () => {
  // const renderElement = useCallback(props => <Element {...props} />, [])
  // const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useSlate()

  const handleKeyDown = event => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  // const handleOnChange = value => {
  //   const isAstChange = editor.operations.some(
  //     op => 'set_selection' !== op.type
  //   )
  //   if (isAstChange) {
  //     onChange(value)
  //   }
  // }

  return (
    // <Slate editor={editor} value={initialValue} onChange={handleOnChange}>
    //   <EditorToolBar />
    <Editable
      autoFocus
      renderElement={Element}
      renderLeaf={Leaf}
      onKeyDown={handleKeyDown}
      className='resume-editor h-[800px]'
    />
    // </Slate>
  )
}

// export default dynamic(() => Promise.resolve(ResumeEditor), { ssr: false })
export default ResumeEditor
