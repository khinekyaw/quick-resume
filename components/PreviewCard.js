import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { TbDotsVertical, TbPencil, TbTrash } from 'react-icons/tb'

import { useMemo, useState } from 'react'
import { Editable, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import Element from './editor/Element'
import Leaf from './editor/Leaf'
import { editorInitialValue } from '../utils/editor'

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
  const { title, updatedAt, content } = data
  const [renmaing, setRenaming] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const editor = useMemo(() => withReact(createEditor()), [])

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

  return (
    <div className='card flex flex-col p-4 w-full aspect-square'>
      <div className='h-18'>
        <div className='flex justify-between'>
          <form className='font-bold mb-2' onSubmit={handleSubmit}>
            {renmaing ? (
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onBlur={handleCancel}
                className='outline-indigo-300'
                autoFocus
              />
            ) : (
              <h2>{title}</h2>
            )}
          </form>
          <OptionDropdown onDelete={onDelete} onRename={onRenameClick} />
        </div>
        <p className='text-sm text-gray-500 mb-4'>Updated {updatedAt}</p>
      </div>
      <Link
        href={`/resume/${data.id}`}
        className='card-image-container flex-1 relative overflow-hidden'
      >
        <div className='bg-red-100 absolute w-full resume-preview'>
          <div
            className='w-[500px] min-h-[800px] scale-[45%] origin-top bg-white 
          p-6 absolute left-1/2 -translate-x-1/2'
          >
            <Slate
              editor={editor}
              value={content ? content : editorInitialValue}
            >
              <Editable renderElement={Element} renderLeaf={Leaf} readOnly />
            </Slate>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PreviewCard
