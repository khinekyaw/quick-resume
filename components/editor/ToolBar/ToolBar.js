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
import ToolButton from '../ToolButton/ToolButton'
import ThreeBlock from '../../icons/ThreeBlock'
import ListEditor from '../../../lib/editor/list'
import LinkEditor from '../../../lib/editor/link'

const toggleLink = editor => {
  if (LinkEditor.isLinkActive(editor)) return LinkEditor.unwrapLink(editor)

  const url = window.prompt('Enter the URL of the link:')
  if (url) {
    LinkEditor.wrapLink(editor, url)
  }
}

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
        active={LinkEditor.isLinkActive(editor)}
        onMouseDown={e => {
          e.preventDefault()
          toggleLink(editor)
        }}
      />
      <ToolButton
        onMouseDown={e => {
          e.preventDefault()
          ListEditor.toggleBulletList(editor)
        }}
        icon={<TbList />}
        active={ListEditor.isListBlock(editor)}
      />
      <div className='border-r mx-1'></div>
      <BlockButton format='two-block' icon={<CiGrid2V />} />
      <BlockButton format='three-block' icon={<ThreeBlock />} />
    </div>
  )
}

export default ToolBar
