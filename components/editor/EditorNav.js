import Image from 'next/image'
import Link from 'next/link'
import { TbArrowLeft, TbMenu2 } from 'react-icons/tb'

const EditorNav = ({ title }) => {
  return (
    <div className='bg-white opacity-95 fixed w-full z-50 top-0'>
      <div className='section h-16 flex justify-between'>
        <div className='flex'>
          <TbArrowLeft />
          <Link href='/' className='flex items-center hover:opacity-75'>
            <Image
              src='/resume-logo.svg'
              width={32}
              height={32}
              className='mr-2'
              alt='logo'
            />
          </Link>
        </div>
        <h2 className='text-gray-800 text-lg'>{title}</h2>
        <div>
          <button className='btn btn-ghost'>
            <TbMenu2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorNav
