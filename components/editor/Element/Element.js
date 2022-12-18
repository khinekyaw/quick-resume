import s from './Element.module.css'

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span contentEditable={false} className={s.inlineChromiumBugfix}>
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'h1':
      return (
        <h1 style={style} className={s.headingOne} {...attributes}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 style={style} className={s.headingTwo} {...attributes}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 style={style} className={s.headingThree} {...attributes}>
          {children}
        </h3>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
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
        <div className={s.twoBlock} {...attributes}>
          {children}
        </div>
      )
    case 'block-child':
      return (
        <div className={s.blockChild} {...attributes}>
          {children}
        </div>
      )
    case 'link':
      return (
        <a href={element.url} className={s.link} {...attributes}>
          <InlineChromiumBugfix />
          {children}
          <InlineChromiumBugfix />
        </a>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
export default Element
