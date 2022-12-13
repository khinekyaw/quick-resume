import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='header'>
      <div className='section h-16'>
        <Link href='/' className='flex items-center hover:opacity-75'>
          <Image
            src='/logo.svg'
            width={36}
            height={36}
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
