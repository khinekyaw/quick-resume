import React from 'react'
import { useSlate } from 'slate-react'
import {
  TbBold,
  TbItalic,
  TbCode,
  TbLink,
  TbList,
  TbUnlink,
} from 'react-icons/tb'
import { CiGrid2V } from 'react-icons/ci'

import BlockButton from '../BlockButton/BlockButton'
import MarkButton from '../MarkButton/MarkButton'
import ThreeBlock from '../../icons/ThreeBlock'
import ToolButton from '../ToolButton/ToolButton'
import CustomEditor, { insertLink } from '../../../utils/editor'

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
      <ToolButton
        icon={<TbLink />}
        activeIcon={<TbUnlink />}
        active={CustomEditor.isLinkActive(editor)}
        onMouseDown={e => {
          e.preventDefault()
          insertLink(editor)
        }}
      />
      <BlockButton format='bulleted-list' icon={<TbList />} />
      <div className='border-r mx-1'></div>
      <BlockButton format='two-block' icon={<CiGrid2V />} />
      <BlockButton format='three-block' icon={<ThreeBlock />} />
    </div>
  )
}

export default ToolBar
