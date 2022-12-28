import { useSelected } from 'slate-react'
import cn from 'clsx'

import s from './Element.module.css'

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span contentEditable={false} className={s.inlineChromiumBugfix}>
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

const Link = ({ attributes, children, element }) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={cn(s.link, selected && 'underline')}
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}

const Element = props => {
  const { attributes, children, element, preview, theme } = props
  const styleClasses = cn(preview && s.preview, theme && s[theme])
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'h1':
      return (
        <h1
          style={style}
          className={cn(s.headingOne, styleClasses)}
          {...attributes}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          style={style}
          className={cn(s.headingTwo, styleClasses)}
          {...attributes}
        >
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3
          style={style}
          className={cn(s.headingThree, styleClasses)}
          {...attributes}
        >
          {children}
        </h3>
      )
    case 'bullet-list':
      return (
        <ul
          className={cn(s.bulletList, styleClasses)}
          style={style}
          {...attributes}
        >
          {children}
        </ul>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'two-block':
      return (
        <div className={cn(s.twoBlock, styleClasses)} {...attributes}>
          {children}
        </div>
      )
    case 'three-block':
      return (
        <div className={cn(s.threeBlock, styleClasses)} {...attributes}>
          {children}
        </div>
      )
    case 'block-child':
      return (
        <div className={cn(s.blockChild, styleClasses)} {...attributes}>
          {children}
        </div>
      )
    case 'link':
      return <Link {...props} />
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
export default Element
