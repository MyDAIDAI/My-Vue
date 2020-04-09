// <div>


// h函数将传入的值转化为下面的虚拟对象 
// {
//   tag: 'div',
//   props: {
//     id: 'container'
//   },
//   children: [
//     {
//       tag: 'span',
//       props: {
//         style: 'color: red'
//       },
//       children: [
//         {
//           tag: undefined,
//           props: undefined,
//           children: undefined,
//           text: 'hello'
//         }
//       ]
//     },
//     {
//       tag: undefined,
//       props: undefined,
//       children: undefined,
//       text: 'world'
//     }
//   ]
// }
function vnode(tag, props, children, text) {
  let key = props && props.key
  return {
    tag,
    props,
    children,
    text,
    key: key
  }
} 
/**
 * 创建vnode
 */
export default function h(tag, props, ...children) {
  children = children.map(child => {
    if (typeof child === 'object') {
      return child;
    } else {
      return vnode(undefined, undefined, undefined, child);
    }
  })
  return vnode(tag, props, children, undefined);
}

