import dynamic from 'next/dynamic'
import React, { useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'

import { toggleMark } from '../utils/editor'
import EditorToolBar from './editor/EditorToolBar'
import Element from './editor/Element'
import Leaf from './editor/Leaf'
import { resumeLocalStore } from '../utils/localStorage'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const ResumeEditor = ({ value }) => {
  const initialValue = value
    ? value
    : [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ]
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const handleKeyDown = event => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
  }

  const handleOnChange = value => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      resumeLocalStore.update({
        id: '1670942146283',
        updatedAt: new Date().toLocaleString(),
        title: 'My Resume',
        content: value,
      })
    }
  }

  return (
    <Slate editor={editor} value={initialValue} onChange={handleOnChange}>
      <EditorToolBar />
      <Editable
        autoFocus
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        className='resume-editor h-[800px]'
      />
    </Slate>
  )
}

export default dynamic(() => Promise.resolve(ResumeEditor), { ssr: false })
