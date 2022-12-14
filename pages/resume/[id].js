import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import Layout from '../../components/Layout'
import ResumePreview from '../../components/ResumePreview'
import ResumeEditor from '../../components/ResumeEditor'
import EditorToolBar from '../../components/editor/EditorToolBar'
import EditorNav from '../../components/editor/EditorNav'
import { resumeLocalStore } from '../../utils/localStorage'
import { editorInitialValue } from '../../utils/editor'

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

  const handleOnChange = value => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      resumeLocalStore.update({ ...doc, content: value })
    }
  }

  return (
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav title={doc && doc.title} onTitleSubmit={handleTitleSubmit} />
      {doc ? (
        <div className='section my-8'>
          <div className='grid grid-cols-7 gap-7 w-full'>
            <div className='col-span-5'>
              <Slate
                editor={editor}
                value={doc.content ? doc.content : editorInitialValue}
                onChange={handleOnChange}
              >
                <EditorToolBar />
                <ResumeEditor editor={editor} />
              </Slate>
            </div>
            <div className='col-span-2'>
              <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
              <ResumePreview value={doc.content} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

export default Edit
