import {
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
  Point,
} from 'slate'

const TWO_BLOCK = 'two-block'
const THREE_BLOCK = 'three-block'
const BLOCK_CHILD = 'block-child'
const BLOCK_TYPES = [TWO_BLOCK, THREE_BLOCK]

const BlockEditor = {
  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
    return Boolean(match)
  },
  createParagraphNode(text = '') {
    return {
      type: 'paragraph',
      children: [{ text }],
    }
  },
  createChildNode(text = '') {
    return {
      type: BLOCK_CHILD,
      children: [this.createParagraphNode(text)],
    }
  },
  createBlockNode(type = 'two-block', children) {
    return {
      type,
      children,
    }
  },
  focusFirstChild(editor) {
    const {
      selection: { anchor, focus },
    } = editor
    Transforms.select(editor, {
      anchor,
      // Currently path is hard coded, relative to previous path
      focus: { ...focus, path: [focus.path[0] - 1, 0, 0, 0] },
    })
    Transforms.collapse(editor, { edge: 'start' })
  },
  insert2Block(editor) {
    const blockChilds = [this.createChildNode(), this.createChildNode()]
    const twoBlock = this.createBlockNode('two-block', blockChilds)
    // Pad with blank paragraph
    const nodes = [
      this.createParagraphNode(),
      twoBlock,
      this.createParagraphNode(),
    ]

    Transforms.insertNodes(editor, nodes)
    // Move cursor to first child
    this.focusFirstChild(editor)
  },
  unwrapBlocks(editor) {
    const { selection } = editor

    if (selection) {
      const { focus } = selection

      // Unwrap the block childs first
      Transforms.unwrapNodes(editor, {
        at: focus.path[0],
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === BLOCK_CHILD,
      })
      // Unwrap the block parent
      Transforms.unwrapNodes(editor, {
        at: focus.path[0],
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          BLOCK_TYPES.includes(n.type),
      })
    }
  },
  toggle2Block(editor) {
    if (this.isBlockActive(editor, TWO_BLOCK)) {
      return this.unwrapBlocks(editor)
    }
    this.insert2Block(editor)
  },
}

export const withBlocks = editor => {
  const { deleteForward, deleteBackward } = editor

  editor.deleteBackward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === BLOCK_CHILD,
      })

      if (cell) {
        const [, cellPath] = cell
        const start = Editor.start(editor, cellPath)

        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.deleteForward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === BLOCK_CHILD,
      })

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }
  return editor
}

export default BlockEditor
