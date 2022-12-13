import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='bg-white opacity-95 fixed w-full z-50'>
      <div className='section h-16'>
        <Link href='/' className='flex items-center hover:opacity-75'>
          <Image
            src='/resume-logo.svg'
            width={32}
            height={32}
            className='mr-2'
            alt='logo'
          />
          <h1 className='text-gray-700 text-xl'>Quick Resume</h1>
        </Link>
      </div>
    </div>
  )
}

export default Header
