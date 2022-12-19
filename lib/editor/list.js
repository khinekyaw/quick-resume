import { Editor, Transforms } from "slate"

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
    const [list_node] = Editor.above(editor, {
      at: selection,
      match: n => n.type === 'bullet-list',
      mode: 'lowest'
    }) || []

    if (list_node && list_node.children.length === 1 && selection.anchor.offset === 0) {
      ListEditor.unwrapBulletList(editor)
    } else {
      deleteBackward(options)
    }
  }

  return editor
}


export default ListEditor
