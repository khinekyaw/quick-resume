import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../components/Layout'
import CreateCard from '../components/CreateCard'
import PreviewCard from '../components/PreviewCard'
import { resumeLocalStore } from '../utils/localStorage'
import { deleteResume, setResumes, updateResume } from '../store/resumeSlice'

export default function Home() {
  const resumes = useSelector(state => state.resumes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setResumes(resumeLocalStore.all()))
    return () => dispatch(setResumes([]))
  }, [])

  const handleDelete = resume => () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${resume.title}`
    )
    if (confirm) dispatch(deleteResume(resume.id))
  }

  const handleTitleSubmit = resume => title => {
    dispatch(updateResume({ id: resume.id, title }))
  }

  return (
    <Layout>
      <div className='section py-10'>
        <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-6'>
          {resumes.map(resume => (
            <PreviewCard
              key={resume.id}
              data={resume}
              onDelete={handleDelete(resume)}
              onSubmit={handleTitleSubmit(resume)}
            />
          ))}
          <CreateCard />
        </div>
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
