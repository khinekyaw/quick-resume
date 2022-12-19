import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import Editable from '../Editable/Editable'
import ToolBar from '../ToolBar/ToolBar'
import { withBulletList } from '../../../lib/editor/list'
import { editorDefaultValue } from '../../../utils/editor'

const Editor = ({ value, onChange }) => {
  const editor = useMemo(() => withBulletList(withHistory(withReact(createEditor()))), [])

  return (
    <Slate
      editor={editor}
      value={value ? value : editorDefaultValue}
      onChange={value => onChange(editor, value)}
    >
      <ToolBar />
      <Editable editor={editor} />
    </Slate>
  )
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false })
