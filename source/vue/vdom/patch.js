
export default function render(vnode, container) { 
  let el = createElm(vnode, container);
  container.appendChild(el);
}
// 将虚拟节点转换为真实节点
function createElm(vnode) {
  let {tag, props, children, text} = vnode;
  if (typeof tag === 'string') { 
    vnode.el = document.createElement(tag);  // 标签
    updateProperties(vnode);
    children.forEach(child => {
      render(child, vnode.el);
    })
  } else {
    vnode.el = document.createTextNode(text); // 文本
  }
  return vnode.el
}
 
// 更新属性调用此方法，需要用新的属性来更新老的节点里面的属性
// 如果老的属性里面有，新的属性里面没有，则将 el 中的属性删除
function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.props;
  let el = vnode.el;
  let newStyle = newProps.style || {};
  let oldStyle = oldProps.style || {};
  for(let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = '';
    }
  }
  for(let key in oldProps) {
    if (!newProps[key]) {
      delete el[key];
    }
  }
  for(let key in newProps) {
    if (key === 'style') {
      for(let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if(key === 'class') {
      el.className = newProps.class;
    } else {
      el[key] = newProps[key];
    }
  }
}