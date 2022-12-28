import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { TbMenu2 } from 'react-icons/tb'

import { resumeLocalStore } from '../../../utils/localStorage'

const Header = ({ variant = 'landing' }) => {
  return (
    <div className='header'>
      <div className='section h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center hover:opacity-80'>
          <Image
            src='/logo.svg'
            width={20}
            height={20}
            className='mr-2 h-9 w-auto md:inline-block hidden'
            alt='logo'
          />
          <Image
            src='/logo-mini.svg'
            width={20}
            height={20}
            className='mr-2 h-9 w-auto inline-block md:hidden'
            alt='logo'
          />
        </Link>
        {variant === 'landing' && <LandingHeaderContent />}
        {variant === 'dashboard' && <DashboardHeaderContent />}
      </div>
    </div>
  )
}

const LandingHeaderContent = () => {
  return (
    <Fragment>
      <div className='space-x-12'>
        <Link href='#'>How it works</Link>
        <Link href='#'>Pricing</Link>
      </div>
      <div>
        <Link href='/dashboard' className='btn btn-primary mr-6'>
          Get Started
        </Link>
      </div>
    </Fragment>
  )
}

const DashboardHeaderContent = () => {
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
    <div>
      <button className='btn btn-primary mr-6' onClick={handleCreate}>
        Create
      </button>
      <button>
        <TbMenu2 />
      </button>
    </div>
  )
}

export default Header
