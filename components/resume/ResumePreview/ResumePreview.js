import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import Element from '../../../components/editor/Element'
import Leaf from '../../../components/editor/Leaf'
import { withBlocks } from '../../../lib/editor/block'
import { withLinks } from '../../../lib/editor/link'
import { withBulletList } from '../../../lib/editor/list'

const FRAME_WIDTH = 800

const ResumePreview = ({ resume }) => {
  const editor = useMemo(
    () =>
      withBlocks(
        withLinks(withBulletList(withHistory(withReact(createEditor()))))
      ),
    []
  )

  const wrapperRef = useRef()
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const iframe_scale = (wrapperWidth / FRAME_WIDTH).toPrecision(4)
  const [slateKey, setSlateKey] = useState(0)

  useEffect(() => {
    setSlateKey(prev => prev + 1)
  }, [resume])

  useEffect(() => {
    setWrapperWidth(wrapperRef.current.offsetWidth)
  }, [])

  return (
    <div ref={wrapperRef} className='relative bg-blue-100 h-64'>
      {resume ? (
        <Slate key={slateKey} editor={editor} value={resume.content}>
          <Editable
            readOnly
            renderElement={Element}
            renderLeaf={Leaf}
            className='absolute p-10 bg-white left-0 top-0 origin-top-left overflow-hidden rounded-xl shadow-lg'
            style={{
              width: FRAME_WIDTH + 'px',
              minHeight: FRAME_WIDTH * 1.414 + 'px',
              transform: `scale(${iframe_scale})`,
            }}
          />
        </Slate>
      ) : null}
    </div>
  )
}

export default ResumePreview
