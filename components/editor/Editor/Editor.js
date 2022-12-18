import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { createEditor } from 'slate'
import { Slate, useSlate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

import Editable from '../Editable/Editable'
import ToolBar from '../ToolBar/ToolBar'
import ToolButton from '../ToolButton'
import { TbLink } from 'react-icons/tb'
import CustomEditor, {
  editorDefaultValue,
  insertLink,
} from '../../../utils/editor'
import withLinks from '../../../utils/editor/plugins/withLinks'

const TempToolBar = () => {
  const editor = useSlate()
  return (
    <div>
      <ToolButton
        icon={<TbLink />}
        active={CustomEditor.isLinkActive(editor)}
        onClick={e => {
          e.preventDefault()
          insertLink(editor)
        }}
      />
    </div>
  )
}

const Editor = ({ value, onChange }) => {
  const editor = useMemo(
    () => withHistory(withLinks(withReact(createEditor()))),
    []
  )

  return (
    <Slate
      editor={editor}
      value={value ? value : editorDefaultValue}
      onChange={value => onChange(editor, value)}
    >
      <TempToolBar />
      <ToolBar />
      <Editable editor={editor} />
    </Slate>
  )
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false })
