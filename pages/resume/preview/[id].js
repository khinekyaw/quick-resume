import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import Element from '../../../components/editor/Element'
import Leaf from '../../../components/editor/Leaf'
import { withBlocks } from '../../../lib/editor/block'
import { withLinks } from '../../../lib/editor/link'
import { withBulletList } from '../../../lib/editor/list'
import { resumeLocalStore } from '../../../utils/localStorage'

const Preview = () => {
  const editor = useMemo(
    () =>
      withBlocks(
        withLinks(withBulletList(withHistory(withReact(createEditor()))))
      ),
    []
  )
  const [resume, setResume] = useState(null)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    setResume(resumeLocalStore.get(id))
  }, [id])

  return resume ? (
    <Slate editor={editor} value={resume.content}>
      <Editable
        readOnly
        renderElement={Element}
        renderLeaf={Leaf}
        className='bg-white p-8'
        style={{
          minHeight: '141vw',
        }}
      />
    </Slate>
  ) : null
}

export default dynamic(() => Promise.resolve(Preview), { ssr: false })
