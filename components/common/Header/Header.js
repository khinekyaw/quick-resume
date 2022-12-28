import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { TbMenu2 } from 'react-icons/tb'
import { Link as ScrollLink } from 'react-scroll'

import { resumeLocalStore } from '../../../utils/localStorage'
import s from './Header.module.css'

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

const scrollOffset = -60

const LandingHeaderContent = () => {
  return (
    <Fragment>
      <div className='space-x-12 hidden md:block'>
        <ScrollLink
          activeClass={s.active}
          to='how-it-works'
          spy={true}
          smooth={true}
          className={s.scrollLink}
          offset={scrollOffset}
        >
          How it works
        </ScrollLink>
        <ScrollLink
          activeClass={s.active}
          to='pricing'
          spy={true}
          smooth={true}
          className={s.scrollLink}
          offset={scrollOffset}
        >
          Pricing
        </ScrollLink>
      </div>
      <div className='flex items-center'>
        <div>
          <Link href='/dashboard' className='btn btn-primary mr-4 md:mr-0'>
            Get Started
          </Link>
        </div>
        <button className='md:hidden flex justify-center items-center rounded w-10 h-10 hover:bg-gray-200 text-xl'>
          <TbMenu2 />
        </button>
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
