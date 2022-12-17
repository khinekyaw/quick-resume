import React from 'react'
import dynamic from 'next/dynamic'
import { Editable as SlateEditable } from 'slate-react'
import isHotkey from 'is-hotkey'

import Leaf from '../Leaf'
import Element from '../Element'
import { EXECUTE_COMMAND } from '../../../utils/editor'

const Editable = ({ editor }) => {
  const handleKeyDown = event => {
    for (const hotkey in EXECUTE_COMMAND) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        EXECUTE_COMMAND[hotkey](editor)
      }
    }
  }

  return (
    <SlateEditable
      renderLeaf={Leaf}
      renderElement={Element}
      autoFocus
      onKeyDown={handleKeyDown}
      className='bg-white p-6 rounded-md border min-h-screen'
    />
  )
}

export default dynamic(() => Promise.resolve(Editable), { ssr: false })
