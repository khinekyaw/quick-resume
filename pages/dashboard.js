import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../components/common/Layout'
import MobileVoid from '../components/misc/MobileVoid/MobileVoid'
import CreateCard from '../components/resume/CreateCard/CreateCard'
import PreviewCard from '../components/resume/PreviewCard/PreviewCard'
import { deleteResumeById, fetchResumes, selectResumes, selectStatus, updateResumeById } from '../store/resumeSlice'

export default function Home() {
  const resumes = useSelector(selectResumes)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResumes())
    }
  }, [status, dispatch])

  const handleDelete = resume => () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${resume.title}`
    )
    if (confirm) dispatch(deleteResumeById(resume.id))
  }

  const handleTitleSubmit = resume => title => {
    dispatch(updateResumeById(resume.id, { title }))
  }

  return (
    <Layout headerVariant='dashboard'>
      <div className='section py-10'>
        <div className='md:grid hidden grid-col-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-6'>
          {[...resumes].reverse().map(resume => (
            <PreviewCard
              key={resume.id}
              data={resume}
              onDelete={handleDelete(resume)}
              onSubmit={handleTitleSubmit(resume)}
            />
          ))}
          <CreateCard />
        </div>
        <MobileVoid />
      </div>
    </Layout>
  )
}

// export async function getStaticProps(context) {
//   return {
//     props: {
//       resumes: data.resumes,
//     },
//   }
// }
