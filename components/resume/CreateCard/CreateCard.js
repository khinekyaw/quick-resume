import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { editorDefaultValue } from '../../../utils/editor'
import { createResume } from '../../../store/resumeSlice'

const CreateCard = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleCreate = () => {
    dispatch(createResume({
      title: 'Untitled',
      content: editorDefaultValue,
    }))
    router.push('/resume/recent')
  }

  return (
    <div className='card p-2 aspect-square flex flex-col items-center justify-center'>
      <Image
        src='/person-info.svg'
        width={200}
        height={200}
        alt='create resume'
        className='mb-8 w-1/2'
      />
      <button className='btn btn-primary' onClick={handleCreate}>
        Create
      </button>
    </div>
  )
}

export default CreateCard
