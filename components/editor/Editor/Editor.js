import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import Editable from '../Editable/Editable'
import ToolBar from '../ToolBar/ToolBar'

const SlateEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={defaultValue}>
      <ToolBar />
      <Editable editor={editor} />
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
