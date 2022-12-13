import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import EditorNav from '../../components/editor/EditorNav'
import Layout from '../../components/Layout'
import ResumeEditor from '../../components/ResumeEditor'
import ResumePreview from '../../components/ResumePreview'
import { resumeLocalStore } from '../../utils/localStorage'

const Edit = () => {
  const [doc, setDoc] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    setDoc(resumeLocalStore.get(String(id)))
  }, [id])

  return (
    <Layout title='Resume Builder' showNav={false}>
      <EditorNav title={doc && doc.title} />
      {doc ? (
        <div className='section my-8'>
          <div className='grid grid-cols-7 gap-7 w-full'>
            <div className='col-span-5'>
              <ResumeEditor value={doc.content} />
            </div>
            <div className='col-span-2'>
              <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
              <ResumePreview />
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
