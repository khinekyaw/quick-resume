import { Editor, Element as SlateElement, Range, Transforms } from 'slate'

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
      type: 'block-child',
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
  toggle2Block(editor) {
    this.insert2Block(editor)
  },
}

export default BlockEditor
