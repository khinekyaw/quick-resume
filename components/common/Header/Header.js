import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { TbMenu2 } from 'react-icons/tb'
import { Menu } from '@headlessui/react'
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
const scrollDuration = 300

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
          duration={scrollDuration}
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
          duration={scrollDuration}
        >
          Pricing
        </ScrollLink>
      </div>
      <div className='flex items-center'>
        <div>
          <Link
            href='/dashboard'
            className='btn btn-primary btn-outline mr-4 md:mr-0'
          >
            Get Started
          </Link>
        </div>
        <div className='md:hidden'>
          <MobileMenu />
        </div>
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
    <div className='flex items-center'>
      {/* <div>
        <button className='btn btn-ghost mr-6' onClick={handleCreate}>
          Create
        </button>
      </div> */}
      <button className='flex justify-center items-center rounded w-10 h-10 hover:bg-gray-200 text-xl'>
        <TbMenu2 />
      </button>
    </div>
  )
}

const MobileMenu = () => (
  <Menu as='div' className='relative'>
    <Menu.Button className='flex justify-center items-center rounded w-10 h-10 hover:bg-gray-200 text-xl'>
      <TbMenu2 />
    </Menu.Button>
    <Menu.Items className='absolute w-48 mt-2 right-0 z-10 bg-white shadow-md border rounded py-1'>
      <Menu.Item
        as='button'
        className='flex items-center px-4 py-3 hover:bg-gray-100 w-full border-b'
      >
        <ScrollLink
          activeClass={s.active}
          to='how-it-works'
          spy={true}
          smooth={true}
          className={s.scrollLink}
          offset={scrollOffset}
          duration={scrollDuration}
        >
          How it works
        </ScrollLink>
      </Menu.Item>
      <Menu.Item
        as='button'
        className='flex items-center px-4 py-3 hover:bg-gray-100 w-full'
      >
        <ScrollLink
          activeClass={s.active}
          to='pricing'
          spy={true}
          smooth={true}
          className={s.scrollLink}
          offset={scrollOffset}
          duration={scrollDuration}
        >
          Pricing
        </ScrollLink>
      </Menu.Item>
    </Menu.Items>
  </Menu>
)

export default Header
