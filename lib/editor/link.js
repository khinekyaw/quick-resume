import { Editor, Element as SlateElement, Range, Transforms } from 'slate'

export const LINK = 'link'

const LinkEditor = {
  createLinkNode(url, text) {
    return {
      type: LINK,
      url,
      children: text ? [{ text }] : [],
    }
  },

  isLinkActive(editor) {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === LINK,
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

  unwrapLink(editor) {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === LINK,
    })
  },
}

export const withLinks = editor => {
  const { isInline, normalizeNode } = editor

  editor.isInline = element =>
    element.type === LINK ? true : isInline(element)

  // Normalizing
  editor.normalizeNode = entry => {
    const [node] = entry

    if (
      SlateElement.isElement(node) &&
      node.type === LINK &&
      !node.children[0].text
    ) {
      LinkEditor.unwrapLink(editor)
      return
    }
    normalizeNode(entry)
  }

  return editor
}

export default LinkEditor
