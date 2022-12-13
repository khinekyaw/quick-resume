import CreateCard from '../components/CreateCard'
import Layout from '../components/Layout'
import PreviewCard from '../components/PreviewCard'
import data from '../utils/data'

export default function Home({ resumes }) {
  return (
    <Layout>
      <div className='section py-10'>
        <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-6'>
          {resumes.map(resume => (
            <PreviewCard key={resume.id} data={resume} />
          ))}
          <CreateCard />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      resumes: data.resumes,
    },
  }
}
