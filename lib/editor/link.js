import { Editor, Element as SlateElement, Range, Transforms } from 'slate'

const LinkEditor = {
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

  unwrapLink(editor) {
    console.log('unwrap')
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  },
}

export const withLinks = editor => {
  const { isInline } = editor
  editor.isInline = element =>
    element.type === 'link' ? true : isInline(element)
  return editor
}

export default LinkEditor
