import { Editor, Transforms } from 'slate'

const CustomEditor = {
  isMarkActive(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: n => Boolean(n[mark]),
      universal: true,
    })

    return Boolean(match)
  },

  toggleMark(editor, mark) {
    const isActive = this.isMarkActive(editor, mark)
    if (isActive) {
      Editor.removeMark(editor, mark)
    } else {
      Editor.addMark(editor, mark, true)
    }
  },

  isBlockActive(editor, block) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === block,
    })
    return Boolean(match)
  },

  toggleBlock(editor, block) {
    const isActive = this.isBlockActive(editor, block)

    Transforms.setNodes(
      editor,
      { type: isActive ? null : block },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  createGrid(editor) {
    const twoBlock = {
      type: 'two-block',
      children: [
        {
          type: 'block-child',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'block 1' }],
            },
          ],
        },
        {
          type: 'block-child',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'block 2' }],
            },
          ],
        },
      ],
    }

    Transforms.insertNodes(editor, twoBlock)
  },
}

export const EXECUTE_COMMAND = {
  'mod+b': editor => CustomEditor.toggleMark(editor, 'bold'),
  'mod+i': editor => CustomEditor.toggleMark(editor, 'italic'),
  'mod+u': editor => CustomEditor.toggleMark(editor, 'underline'),
  'mod+`': editor => CustomEditor.toggleMark(editor, 'code'),
  'mod+h': editor => CustomEditor.toggleBlock(editor, 'h1'),
  'mod+j': editor => CustomEditor.toggleBlock(editor, 'h2'),
  'mod+d': editor => CustomEditor.createGrid(editor),
}

export default CustomEditor
