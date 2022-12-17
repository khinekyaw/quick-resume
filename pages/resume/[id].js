import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'
import { useDispatch, useSelector } from 'react-redux'

import { resumeLocalStore } from '../../utils/localStorage'
import { editorInitialValue } from '../../utils/editor'
import {
  setCurrentResume,
  updateCurrentResumeContent,
  updateCurrentResumeTitle,
} from '../../store/editorSlice'
import ResumePreview from '../../components/resume/ResumePreview'
import EditorNav from '../../components/editor/EditorNav'
import Layout from '../../components/common/Layout/Layout'

const Edit = () => {
  const currentResume = useSelector(state => state.editor.currentResume)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const editor = useMemo(
    () => withHistory(withReact(createEditor())),
    [currentResume]
  )

  useEffect(() => {
    dispatch(setCurrentResume(resumeLocalStore.get(String(id))))
    return () => dispatch(setCurrentResume(null))
  }, [id])

  const handleTitleSubmit = title => {
    dispatch(updateCurrentResumeTitle(title))
  }

  const handleOnChange = value => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      dispatch(updateCurrentResumeContent(value))
    }
  }

  return (
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav
        title={currentResume && currentResume.title}
        onTitleSubmit={handleTitleSubmit}
      />
      {currentResume ? (
        <div className='section my-8'>
          <div className='grid grid-cols-7 gap-7 w-full'>
            <div className='col-span-5'>
              {/* <Slate
                editor={editor}
                value={
                  currentResume.content
                    ? currentResume.content
                    : editorInitialValue
                }
                onChange={handleOnChange}
              >
                <EditorToolBar />
                <ResumeEditor editor={editor} />
              </Slate> */}
            </div>
            <div className='col-span-2'>
              <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
              <ResumePreview value={currentResume.content} />
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
