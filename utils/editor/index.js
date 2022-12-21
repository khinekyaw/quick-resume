import { Editor, Element as SlateElement, Range, Transforms } from 'slate'

const CustomEditor = {
  isMarkActive(editor, mark) {
    const marks = Editor.marks(editor)
    return marks ? marks[mark] === true : false
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

  unwrapLink(editor) {
    console.log('unwrap')
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  },

  createLinkNode(url, text) {
    return {
      type: 'link',
      url,
      children: text ? [{ text }] : [],
    }
  },

  isLinkActive(editor) {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return Boolean(link)
  },

  wrapLink(editor, url) {
    const { selection } = editor

    const isCollapsed = selection && Range.isCollapsed(selection)

    const link = this.createLinkNode(url, isCollapsed && url)

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
      Transforms.move(editor, { unit: 'offset' })
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }
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

export const insertLink = editor => {
  const isActive = CustomEditor.isLinkActive(editor)
  if (isActive) return CustomEditor.unwrapLink(editor)

  const url = window.prompt('Enter the URL of the link:')
  if (url) {
    CustomEditor.wrapLink(editor, url)
  }
}

export const EXECUTE_COMMAND = {
  'mod+b': editor => CustomEditor.toggleMark(editor, 'bold'),
  'mod+i': editor => CustomEditor.toggleMark(editor, 'italic'),
  'mod+u': editor => CustomEditor.toggleMark(editor, 'underline'),
  'mod+`': editor => CustomEditor.toggleMark(editor, 'code'),
  'mod+h': editor => CustomEditor.toggleBlock(editor, 'h1'),
  'mod+j': editor => CustomEditor.toggleBlock(editor, 'h2'),
  'mod+d': CustomEditor.createGrid,
  'mod+k': insertLink,
}

export const editorDefaultValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export default CustomEditor
