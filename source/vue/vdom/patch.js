
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
  let newProps = vnode.props || {};
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

// 对两个虚拟节点以及其中的 children 进行比较， 也就是 diff 操作
export function patch(oldVnode, newVnode) {
  // 1.如果两个vnode节点的tag不一致，则直接使用newVnode中的内容替换老的
  if (oldVnode.tag !== newVnode.tag) {
    oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
  }
  // 2.两个节点的标签一样，可能都为 undefined, 也就是文本节点，则使用新的newVnode中的text替换oldVnode中el的元素的内容
  console.log('patch', oldVnode, newVnode);
  if (!oldVnode.tag) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.el.textContent = newVnode.text;
    }
  }
  // 3.标签一样，且都不为文本节点，则更新属性
  let el = newVnode.el = oldVnode.el;
  updateProperties(newVnode, oldVnode.props);
  
  // 4.根节点比较完成，比较孩子节点
  let oldChildren = oldVnode.children || [];
  let newChildren = newVnode.children || [];
  
  if (oldChildren.length > 0 && newChildren.length > 0) { // 1) 老的有孩子，新的有孩子
    updateChildren(el, oldChildren, newChildren);
  } else if (oldChildren.length > 0) { // 2) 老的有孩子，新的没孩子
    el.innerHTML = ''
  } else if (newChildren.length > 0) {  // 3) 老的没孩子，新的有孩子
    for(let i = 0; i < newChildren.length; i++) {
      let child = newChildren[i];
      el.appendChild(createElm(child));
    }
  }
}
function isSameVnode(oldVnode, newVnode) {
  return (oldVnode.tag === newVnode.tag) && (newVnode.key === oldVnode.key)
}

// 都有孩子，则使用指针对每一个孩子进行比较
function updateChildren(el, oldChildren, newChildren) {
  // 老虚拟节点指针
  let oldStartIndex = 0;
  let oldStartVnode = oldChildren[0];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVnode = oldChildren[oldEndIndex];

  // 新虚拟节点指针
  let newStartIndex = 0;
  let newStartVnode = newChildren[0];
  let newEndIndex = newChildren.length - 1;
  let newEndVnode = newChildren[newEndIndex];

  let parent = el.parentNode;

  while (oldStartIndex <= oldEndIndex &&  newStartIndex <= newEndIndex) {
    if (isSameVnode(oldStartVnode, newStartVnode)) { // 首先比较开始节点，如果新旧节点开始节点都相同，则指针后移，直到某一方到达底部
      patch(oldStartVnode, newStartVnode); // 更新属性以及子节点
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 从头开始比较两个节点不同，则比较尾节点，尾节点相同则依次向前移动指针，直到开始位置
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) { // 从前后比较均不相同，则使用 old 中开始的节点与 new 最后的节点进行比较
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) { // 上面的条件都不满足，则判断 old 最后的节点 与 new 开始的节点是否相同
      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el.previousSibling);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    }
  }
  
  if (newStartIndex <= newEndIndex) {
    for(let i = newStartIndex; i <= newEndIndex; i++) {
      let ele = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
      parent.insertBefore(createElm(newChildren[i]), ele);
    }
  }
}