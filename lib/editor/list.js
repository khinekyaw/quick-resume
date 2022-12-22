import { Editor, Element, Transforms } from "slate"

const ListEditor = {
  isListBlock(editor) {
    const [match] = Editor.nodes(
      editor,
      { match: n => n.type === 'list-item' }
    )
    return !!match
  },

  wrapWithBulletList(editor) {
    Transforms.setNodes(
      editor,
      { type: 'list-item' },
      { match: n => Editor.isBlock(editor, n) }
    )
    Transforms.wrapNodes(
      editor,
      { type: 'bullet-list', children: []},
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  unwrapBulletList(editor) {
    Transforms.setNodes(
      editor,
      { type: 'paragraph' },
      { match: n => n.type === 'list-item' }
    )
    Transforms.unwrapNodes(
      editor,
      { match: n => n.type === 'bullet-list', split: true }
    )
  },

  toggleBulletList(editor) {
    if (ListEditor.isListBlock(editor))
      ListEditor.unwrapBulletList(editor)
    else ListEditor.wrapWithBulletList(editor)
  },
}

export const withBulletList = editor => {
  const { deleteBackward } = editor

  editor.deleteBackward = (options) => {
    const { selection } = editor
    const [node, path] = Editor.above(editor, {
      at: selection,
      match: n => n.type === 'list-item',
      mode: 'lowest'
    }) || []

    if (Element.isElement(node) && Editor.isStart(editor, selection.anchor, path)) {
      ListEditor.unwrapBulletList(editor)
    } else {
      deleteBackward(options)
    }
  }

  return editor
}


export default ListEditor
