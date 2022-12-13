import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import EditorNav from '../../components/editor/EditorNav'
import EditorToolBar from '../../components/editor/EditorToolBar'
import Layout from '../../components/Layout'
import ResumePreview from '../../components/ResumePreview'
import { resumeLocalStore } from '../../utils/localStorage'

import isHotkey from 'is-hotkey'
import { toggleMark } from '../../utils/editor'
import Leaf from '../../components/editor/Leaf'
import Element from '../../components/editor/Element'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const Edit = () => {
  const [doc, setDoc] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const editor = useMemo(() => withHistory(withReact(createEditor())), [doc])

  useEffect(() => {
    setDoc(resumeLocalStore.get(String(id)))
  }, [id])

  const handleTitleSubmit = title => {
    resumeLocalStore.update({ id, title })
  }

  // const handleEditorChange = value => {
  //   resumeLocalStore.update({ ...doc, content: value })
  // }

  const handleOnChange = value => {
    // console.log('change')
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      // console.log('update')
      resumeLocalStore.update({ ...doc, content: value })
    }
  }

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
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav title={doc && doc.title} onTitleSubmit={handleTitleSubmit} />
      {doc ? (
        <Slate
          editor={editor}
          value={doc.content ? doc.content : initialValue}
          onChange={handleOnChange}
        >
          <div className='section my-8'>
            <div className='grid grid-cols-7 gap-7 w-full'>
              <div className='col-span-5'>
                <EditorToolBar />
                <Editable
                  autoFocus
                  renderElement={Element}
                  renderLeaf={Leaf}
                  onKeyDown={handleKeyDown}
                  className='resume-editor h-[800px]'
                />
              </div>
              <div className='col-span-2'>
                <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
                <ResumePreview value={doc.content} />
              </div>
            </div>
          </div>
        </Slate>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export default Edit
