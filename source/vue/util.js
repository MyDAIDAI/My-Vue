let defaultReg = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const utils = {
  getValue(vm, expr) {
    let keys = expr.split('.');
    return keys.reduce(function (memo, current) {
      memo = memo[current];
      return memo;
    }, vm);
  },
  compilerTxt: function (node, vm) {
    // <div>{{msg}}</div> -> <div>hello</div>
    node.textContent = node.textContent.replace(defaultReg, function (...args) {
      return utils.getValue(vm, args[1]);
    })
  }
}
export function compiler(node, vm) {
  let childNodes = node.childNodes;
  // 将类数组转换为数组并进行遍历
  [...childNodes].forEach(child => {
    if (child.nodeType === 1) { // 1 元素节点 3 文本节点
      compiler(child, vm);
    } else if (child.nodeType === 3) {
      utils.compilerTxt(node,vm);
    }
  });
}