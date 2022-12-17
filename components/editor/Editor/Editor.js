import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createEditor, Editor, Transforms } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import isHotkey from 'is-hotkey'

import Leaf from '../Leaf'
import Element from '../Element'

const CustomEditor = {
  isMarkActive(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: n => Boolean(n[mark]),
      universal: true,
    })

    return Boolean(match)
  },

  toggleMark(editor, mark) {
    const isActive = this.isMarkActive(editor, mark)
    if (isActive) {
      Editor.removeMark(editor, mark)
    } else {
      Editor.addMark(editor, mark, true)
    }
  },

  isBlockActive(editor, block) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === block,
    })
    return Boolean(match)
  },

  toggleBlock(editor, block) {
    const isActive = this.isBlockActive(editor, block)

    Transforms.setNodes(
      editor,
      { type: isActive ? null : block },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  createGrid(editor) {
    const twoBlock = {
      type: 'two-block',
      children: [
        {
          type: 'block-child',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'block 1' }],
            },
          ],
        },
        {
          type: 'block-child',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'block 2' }],
            },
          ],
        },
      ],
    }

    Transforms.insertNodes(editor, twoBlock)
  },
}

const KEY_MAP = {
  'mod+b': editor => CustomEditor.toggleMark(editor, 'bold'),
  'mod+i': editor => CustomEditor.toggleMark(editor, 'italic'),
  'mod+u': editor => CustomEditor.toggleMark(editor, 'underline'),
  'mod+`': editor => CustomEditor.toggleMark(editor, 'code'),
  'mod+h': editor => CustomEditor.toggleBlock(editor, 'h1'),
  'mod+j': editor => CustomEditor.toggleBlock(editor, 'h2'),
  'mod+d': editor => CustomEditor.createGrid(editor),
}

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const handleKeyDown = event => {
    for (const hotkey in KEY_MAP) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        KEY_MAP[hotkey](editor)
      }
    }
  }

  return (
    <Slate editor={editor} value={defaultValue}>
      <Editable
        renderLeaf={Leaf}
        renderElement={Element}
        autoFocus
        onKeyDown={handleKeyDown}
      />
    </Slate>
  )
}

const defaultValue = [
  {
    type: 'paragraph',
    children: [{ text: 'default' }],
  },
]

export default dynamic(() => Promise.resolve(SlateEditor), { ssr: false })
