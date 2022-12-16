import React from 'react'
import {
  TbBold,
  TbItalic,
  TbCode,
  TbLink,
  TbList,
  TbMenu,
} from 'react-icons/tb'
import BlockButton from './BlockButton'

import MarkButton from './MarkButton'

const EditorToolBar = () => {
  return (
    <div className='box p-2 mb-2 flex border'>
      <BlockButton format='h1' icon={<p className='text-sm'>H1</p>} />
      <BlockButton format='h2' icon={<p className='text-sm'>H2</p>} />
      <BlockButton format='h3' icon={<p className='text-sm'>H3</p>} />
      <div className='border-r mx-1'></div>
      <MarkButton format='bold' icon={<TbBold />} />
      <MarkButton format='italic' icon={<TbItalic />} />
      <MarkButton format='code' icon={<TbCode />} />
      <div className='border-r mx-1'></div>
      <BlockButton format='link' icon={<TbLink />} />
      <BlockButton format='bulleted-list' icon={<TbList />} />
      <div className='border-r mx-1'></div>
      <BlockButton format='two-block' icon={<TbMenu />} />
    </div>
  )
}

export default EditorToolBar
