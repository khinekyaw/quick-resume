import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResumePreview from '../../components/resume/ResumePreview'
import EditorNav from '../../components/editor/EditorNav'
import Layout from '../../components/common/Layout'
import Editor from '../../components/editor/Editor'
import {
  fetchResumeById,
  updateResumeById,
  selectResumeById,
  selectStatusById,
  selectErrorById,
} from '../../store/resumeSlice'
import { TbDownload } from 'react-icons/tb'
import MobileVoid from '../../components/misc/MobileVoid/MobileVoid'

const Edit = () => {
  const router = useRouter()
  const { id } = router.query
  const resume = useSelector(selectResumeById(id))
  const status = useSelector(selectStatusById(id))
  const error = useSelector(selectErrorById(id))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchResumeById(id))
  }, [id])

  const handleTitleSubmit = useCallback(title => {
    dispatch(updateResumeById(id, { title }))
  }, [id])

  const handleOnChange = useCallback(value => {
    dispatch(updateResumeById(id, { content: value }))
  }, [id])

  let pageContent

  if (status === 'idle' || status === 'loading') {
    pageContent = <p>Loading...</p>
  } else if (status === 'succeeded') {
    pageContent = (
      <div className='section my-8'>
        <div className='md:grid hidden grid-cols-1 md:grid-cols-4 gap-7 w-full'>
          <div className='col-span-3'>
            <Editor value={resume.content} onChange={handleOnChange} />
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
            <ResumePreview resume={resume} />
          </div>
        </div>
        <MobileVoid />
      </div>
    )
  } else if (status === 'failed') {
    pageContent = <p>{error}</p>
  }

  return (
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav
        title={resume && resume.title}
        onTitleSubmit={handleTitleSubmit}
      />
      {pageContent}
    </Layout>
  )
}

export default Edit
