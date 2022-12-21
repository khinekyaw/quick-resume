import { Editor, Transforms } from 'slate'

export const ALIGN_KEY = 'align'

const AlignEditor = {
  isActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && n[ALIGN_KEY] === format,
    })
    return Boolean(match)
  },
  setAlign(editor, format) {
    Transforms.setNodes(editor, {
      [ALIGN_KEY]: format,
    })
  },
  removeAlign(editor) {
    Transforms.setNodes(editor, {
      [ALIGN_KEY]: 'start',
    })
  },
  toggleAlign(editor, format) {
    this.isActive(editor, format)
      ? this.removeAlign(editor)
      : this.setAlign(editor, format)
  },
}

export default AlignEditor
