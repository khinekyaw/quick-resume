import s from './Element.module.css'

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
    case 'bullet-list':
      return (
        <ul className='list-disc list-inside' style={style} {...attributes}>
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
      return <div className={s.blockChild}>{children}</div>
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
export default Element
