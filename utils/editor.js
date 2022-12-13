import { Transforms, Editor, Text, Element as SlateElement } from 'slate'

// export const CustomEditor = {
//   isBoldMarkActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.bold === true,
//       universal: true,
//     })

//     return !!match
//   },

//   isItalicMarkActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.italic === true,
//       universal: true,
//     })

//     return !!match
//   },

//   isCodeBlockActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.type === 'code',
//     })

//     return !!match
//   },

//   toggleBoldMark(editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor)
//     Transforms.setNodes(
//       editor,
//       { bold: isActive ? null : true },
//       { match: n => Text.isText(n), split: true }
//     )
//   },

//   toggleItalicMark(editor) {
//     const isActive = CustomEditor.isItalicMarkActive(editor)
//     Transforms.setNodes(
//       editor,
//       { italic: isActive ? null : true },
//       { match: n => Text.isText(n), split: true }
//     )
//   },

//   toggleCodeBlock(editor) {
//     const isActive = CustomEditor.isCodeBlockActive(editor)
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? null : 'code' },
//       { match: n => Editor.isBlock(editor, n) }
//     )
//   },
// }

export const editorInitialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const GRID_TYPES = ['two-block', 'three-block']
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  const isGrid = GRID_TYPES.includes(format)

  // This remove the neasted component, eg. list
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (LIST_TYPES.includes(n.type) || GRID_TYPES.includes(n.type)) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties
  // if (TEXT_ALIGN_TYPES.includes(format)) {
  //   newProperties = {
  //     align: isActive ? undefined : format,
  //   }
  // } else {
  //   newProperties = {
  //     type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  //   }
  // }
  newProperties = {
    type: isActive
      ? 'paragraph'
      : isList
      ? 'list-item'
      : isGrid
      ? 'grid-child'
      : format,
  }

  console.log(newProperties)

  Transforms.setNodes(editor, newProperties)

  if (!isActive && (isList || isGrid)) {
    console.log('Wrap Nodes:', format)
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
