import Image from 'next/image'
import { useRouter } from 'next/router'
import { resumeLocalStore } from '../utils/localStorage'

const CreateCard = () => {
  const router = useRouter()

  const handleCreate = () => {
    const id = new Date().getTime()
    resumeLocalStore.add({
      id: String(id),
      updatedAt: new Date().toLocaleString(),
      title: 'Untitle',
      content: null,
    })

    // Redirect
    router.push(`resume/${id}`)
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
