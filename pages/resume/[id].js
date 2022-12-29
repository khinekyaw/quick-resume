import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResumePreview from '../../components/resume/ResumePreview'
import EditorNav from '../../components/editor/EditorNav'
import Layout from '../../components/common/Layout'
import Editor from '../../components/editor/Editor'
import {
  fetchResume,
  updateCurrentResume,
  setStatus,
  selectCurrentResume,
  selectEditorStatus,
} from '../../store/editorSlice'
import { TbDownload } from 'react-icons/tb'
import MobileVoid from '../../components/misc/MobileVoid/MobileVoid'

const Edit = () => {
  const currentResume = useSelector(selectCurrentResume)
  const editorStatus = useSelector(selectEditorStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (editorStatus === 'idle' && id) {
      dispatch(fetchResume(id))
    }
  }, [id, editorStatus])

  useEffect(() => {
    if (id && currentResume && currentResume.id !== id) {
      dispatch(setStatus('idle'))
    }
  }, [id])

  const handleTitleSubmit = title => {
    dispatch(updateCurrentResume({ title }))
  }

  const handleOnChange = value => {
    dispatch(updateCurrentResume({ content: value }))
  }

  let pageContent

  if (editorStatus === 'loading') {
    pageContent = <p>Loading...</p>
  } else if (editorStatus === 'succeeded') {
    pageContent = (
      <div className='section my-8'>
        <div className='md:grid hidden grid-cols-1 md:grid-cols-4 gap-7 w-full'>
          <div className='col-span-3'>
            <Editor value={currentResume.content} onChange={handleOnChange} />
          </div>
          <div className='col-span-1'>
            <small className='text-gray-500'>
              <i>Coming soon</i>
            </small>
            <button
              disabled
              className='btn btn-primary flex justify-center items-center mb-4 w-full'
            >
              <TbDownload className='mr-2' /> Save to PC
            </button>
            <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
            <ResumePreview resume={currentResume} />
          </div>
        </div>
        <MobileVoid />
      </div>
    )
  } else if (editorStatus === 'failed') {
    pageContent = <p>Error while loading resume!</p>
  }

  return (
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav
        title={currentResume && currentResume.title}
        onTitleSubmit={handleTitleSubmit}
      />
      {pageContent}
    </Layout>
  )
}

export default Edit
