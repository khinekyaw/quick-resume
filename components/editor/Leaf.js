// const Leaf = props => {
//   return (
//     <span
//       {...props.attributes}
//       style={{
//         fontWeight: props.leaf.bold ? 'bold' : 'normal',
//         fontStyle: props.leaf.italic ? 'italic' : 'normal',
//       }}
//     >
//       {props.children}
//     </span>
//   )
// }

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
