import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { TbArrowLeft, TbMenu2, TbPencil } from 'react-icons/tb'

const EditorNav = ({ title, onTitleSubmit }) => {
  const router = useRouter()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = title
  }, [title])

  const handleSubmit = e => {
    e.preventDefault()
    inputRef.current.blur()
  }

  return (
    <div className='header top-0'>
      <div className='section h-16 flex justify-between'>
        <div className='flex items-center'>
          <button
            className='mr-3 text-xl p-1 rounded hover:bg-gray-200'
            onClick={() => router.back()}
          >
            <TbArrowLeft />
          </button>
          <Link href='/' className='flex items-center hover:opacity-80'>
            <Image
              src='/logo.svg'
              width={36}
              height={36}
              className='mr-2'
              alt='logo'
            />
          </Link>
        </div>
        <form className='relative group' onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            onBlur={() => onTitleSubmit(inputRef.current.value)}
            className='outline-none text-lg text-center font-medium border-b border-transparent focus:border-gray-300'
          />
          <span
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-full
           text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          >
            <TbPencil />
          </span>
        </form>
        <div>
          <button>
            <TbMenu2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorNav
