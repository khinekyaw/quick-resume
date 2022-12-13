const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'h1':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 style={style} {...attributes}>
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
        <div className='bg-slate-100 grid grid-cols-2 gap-2' {...attributes}>
          {children}
        </div>
      )
    case 'grid-child':
      return (
        <div className='col-span-1 border border-indigo-400'>{children}</div>
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
