import React, { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import Editable from '../Editable/Editable'
import ToolBar from '../ToolBar/ToolBar'
import { editorDefaultValue } from '../../../utils/editor'
import { withBulletList } from '../../../lib/editor/list'
import { withLinks } from '../../../lib/editor/link'

const Editor = ({ value, onChange }) => {
  const editor = useMemo(
    () => withLinks(withBulletList(withHistory(withReact(createEditor())))),
    []
  )

  const handleSlateStateChange = useCallback(
    value => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        onChange(value)
      }
    },
    [editor]
  )

  return (
    <Slate
      editor={editor}
      value={value ? value : editorDefaultValue}
      onChange={handleSlateStateChange}
    >
      <ToolBar />
      <Editable editor={editor} />
    </Slate>
  )
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false })
