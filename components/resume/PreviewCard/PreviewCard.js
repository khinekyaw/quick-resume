import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useMemo, useState } from 'react'
import { withReact } from 'slate-react'
import { createEditor } from 'slate'
import { TbDotsVertical, TbPencil, TbTrash } from 'react-icons/tb'
import ResumePreview from '../ResumePreview'
import { useRouter } from 'next/router'

const OptionDropdown = ({ onDelete, onRename }) => (
  <Menu as='div' className='relative'>
    <Menu.Button className='w-8 h-8 flex justify-center items-center rounded hover:bg-gray-200'>
      <TbDotsVertical />
    </Menu.Button>
    <Menu.Items className='absolute right-0 z-10 bg-white shadow-md border rounded py-1'>
      <Menu.Item
        as='button'
        className='flex items-center px-4 py-1 hover:bg-gray-100 w-full'
        onClick={onRename}
      >
        <TbPencil className='mr-2' />
        Rename
      </Menu.Item>
      <Menu.Item
        as='button'
        className='flex items-center px-4 py-1 hover:bg-gray-100 text-rose-500 w-full'
        onClick={onDelete}
      >
        <TbTrash className='mr-2' /> Delete
      </Menu.Item>
    </Menu.Items>
  </Menu>
)

const PreviewCard = ({ data, onDelete, onSubmit }) => {
  const { title, updatedAt } = data
  const [renmaing, setRenaming] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const router = useRouter()

  const onRenameClick = () => {
    setRenaming(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(editTitle)
    setRenaming(false)
  }

  const handleCancel = e => {
    setRenaming(false)
    setEditTitle(title)
  }

  const handleNavigate = () => {
    router.push(`/resume/${data.id}`)
  }

  return (
    <div className='card flex flex-col p-4 w-full aspect-square'>
      <div className='h-18'>
        <div className='flex justify-between'>
          <form className='font-medium' onSubmit={handleSubmit}>
            {renmaing ? (
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onBlur={handleCancel}
                className='outline-indigo-300'
                autoFocus
              />
            ) : (
              <p>{title}</p>
            )}
          </form>
          <OptionDropdown onDelete={onDelete} onRename={onRenameClick} />
        </div>
        <p className='text-sm text-gray-500 mb-4'>Updated {updatedAt}</p>
      </div>
      {/* <Link
        href={`/resume/${data.id}`}
        className='card-image-container flex-1 relative overflow-hidden'
      > */}
      {/* <div className='bg-red-100 absolute w-full resume-preview'>
          <div
            className='w-[500px] min-h-[800px] scale-[45%] origin-top bg-white 
          p-6 absolute left-1/2 -translate-x-1/2'
          ></div>
        </div> */}
      <div
        className='card-image-container flex-1 relative overflow-hidden cursor-pointer'
        onClick={handleNavigate}
      >
        <ResumePreview resume={data} />
      </div>
      {/* </Link> */}
    </div>
  )
}

export default PreviewCard
