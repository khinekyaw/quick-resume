import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TbMenu2 } from 'react-icons/tb'

import { resumeLocalStore } from '../utils/localStorage'

const Header = () => {
  const router = useRouter()

  const handleCreate = () => {
    const id = new Date().getTime()
    resumeLocalStore.add({
      id: String(id),
      updatedAt: new Date().toLocaleString(),
      title: 'Untitled',
      content: null,
    })
    router.push(`resume/${id}`)
  }

  return (
    <div className='header'>
      <div className='section h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center hover:opacity-80'>
          <Image
            src='/logo.svg'
            width={36}
            height={36}
            className='mr-2'
            alt='logo'
          />
          <h1 className='text-gray-800 text-lg font-medium'>Quick Resume</h1>
        </Link>
        <div>
          <button className='btn btn-primary mr-6' onClick={handleCreate}>
            Create
          </button>
          <button>
            <TbMenu2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
