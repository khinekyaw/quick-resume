import Layout from '../../components/Layout'
import ResumeEditor from '../../components/ResumeEditor'
import ResumePreview from '../../components/ResumePreview'
import RichTextExample from '../../components/RichTextExample'

const Edit = () => {
  return (
    <Layout title='Resume Builder'>
      <div className='section my-8'>
        <div className='grid grid-cols-7 gap-7 w-full'>
          <div className='col-span-5'>
            <ResumeEditor />
            {/* <RichTextExample /> */}
          </div>
          <div className='col-span-2'>
            <h2 className='font-bold text-gray-700 mb-4'>Preview</h2>
            <ResumePreview />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
