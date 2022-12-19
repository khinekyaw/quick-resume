import React from 'react'
import { TbBold, TbItalic, TbCode, TbLink, TbList } from 'react-icons/tb'
import { CiGrid2V } from 'react-icons/ci'

import Button from '../Button'
import BlockButton from '../BlockButton/BlockButton'
import MarkButton from '../MarkButton/MarkButton'
import ListEditor from '../../../lib/editor/list'
import { useSlate } from 'slate-react'

const ThreeBlock = () => (
  <svg
    width='25'
    height='18'
    viewBox='0 0 25 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='0.5' y='0.5' width='6' height='17' rx='1.5' stroke='black' />
    <rect x='9.5' y='0.5' width='6' height='17' rx='1.5' stroke='black' />
    <rect x='18.5' y='0.5' width='6' height='17' rx='1.5' stroke='black' />
  </svg>
)

const ToolBar = () => {
  const editor = useSlate()

  return (
    <div className='bg-white p-2 mb-2 flex border rounded-md'>
      <BlockButton format='h1' icon={<p className='text-sm'>H1</p>} />
      <BlockButton format='h2' icon={<p className='text-sm'>H2</p>} />
      <BlockButton format='h3' icon={<p className='text-sm'>H3</p>} />
      <div className='border-r mx-1'></div>
      <MarkButton format='bold' icon={<TbBold />} />
      <MarkButton format='italic' icon={<TbItalic />} />
      <MarkButton format='code' icon={<TbCode />} />
      <div className='border-r mx-1'></div>
      <BlockButton format='link' icon={<TbLink />} />
      <Button onClick={() => ListEditor.toggleBulletList(editor)} icon={<TbList />} active={ListEditor.isListBlock(editor)}/>
      <div className='border-r mx-1'></div>
      <BlockButton format='two-block' icon={<CiGrid2V />} />
      <BlockButton format='three-block' icon={<ThreeBlock />} />
    </div>
  )
}

export default ToolBar
