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

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const initialValue = [
  {
    type: 'h1',
    children: [{ text: 'Kate Miller' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'An engineering manager building and leading engineering teams at Apple Inc',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'h2',
    children: [{ text: 'Work Experience' }],
  },
  {
    type: 'h3',
    children: [{ text: 'Apple Inc' }],
  },
  {
    type: 'paragraph',
    children: [{ bold: true, text: 'Engineering Manager' }],
  },
]

const ResumeEditor = () => {
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

  return (
    <Slate editor={editor} value={initialValue}>
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
