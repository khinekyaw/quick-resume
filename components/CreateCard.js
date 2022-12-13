import Image from 'next/image'

const CreateCard = () => (
  <div className='card p-2 aspect-square flex flex-col items-center justify-center'>
    <Image
      src='/person-info.svg'
      width={200}
      height={200}
      alt='create resume'
      className='mb-8 w-1/2'
    />
    <button className='btn btn-primary'>Create</button>
  </div>
)

export default CreateCard
