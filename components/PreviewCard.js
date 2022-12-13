import Image from 'next/image'
import Link from 'next/link'

const PreviewCard = ({ data }) => {
  const { title, updatedAt, imageUrl } = data

  return (
    <div className='card flex flex-col p-4 w-full aspect-square'>
      <div className='h-18'>
        <h2 className='font-bold mb-2'>{title}</h2>
        <p className='text-sm text-gray-500 mb-4'>Updated {updatedAt}</p>
      </div>
      <Link
        href={`/resume/${data.id}`}
        className='card-image-container flex-1 relative'
      >
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt={title}
          className='h-full w-full absolute object-contain'
        />
      </Link>
    </div>
  )
}

export default PreviewCard
