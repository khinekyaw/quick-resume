import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResumePreview from '../../components/resume/ResumePreview'
import EditorNav from '../../components/editor/EditorNav'
import Layout from '../../components/common/Layout'
import Editor from '../../components/editor/Editor'
import { resumeLocalStore } from '../../utils/localStorage'
import {
  setCurrentResume,
  updateCurrentResumeContent,
  updateCurrentResumeTitle,
} from '../../store/editorSlice'

const Edit = () => {
  const currentResume = useSelector(state => state.editor.currentResume)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(setCurrentResume(resumeLocalStore.get(String(id))))
    return () => dispatch(setCurrentResume(null))
  }, [id])

  const handleTitleSubmit = title => {
    dispatch(updateCurrentResumeTitle(title))
  }

  const handleOnChange = (value) => {
    dispatch(updateCurrentResumeContent(value))
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
              <Editor value={currentResume.content} onChange={handleOnChange} />
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
