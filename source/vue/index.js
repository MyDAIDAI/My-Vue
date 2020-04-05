import {initState} from './observe/index';
import Watcher from './observe/watcher';
import {compiler} from './util';
function Vue(options) {
  this._init(options);
}
Vue.prototype._init = function (options) {
  // vue初始化
  let vm = this;
  vm.$options = options;

  // 需要将数据重新初始化
  initState(vm);

  // 挂载渲染节点
  if (vm.$options.el) {
    this.$mount();
  }
}
function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype._update = function () {
  // 将用户定义的数据插入到文档中
  let vm = this;
  let el = vm.$el;
  
  // 创建文档碎片，处理完后一次挂载到页面中，优化性能
  let node = document.createDocumentFragment();
  let firstChild;
  while (firstChild = el.firstChild) {
    node.appendChild(firstChild); // appendChild 具有迁移作用，会将原来位置的节点迁移到插入位置
  }

  compiler(node, vm);
  el.appendChild(node);
}
Vue.prototype.$mount = function () {
  let vm = this;
  // 获取挂载 DOM 节点
  let el = vm.$options.el;
  el = vm.$el = query(el);

  // 更新或者初始化渲染组件
  let updateComponent = () => {
    vm._update(); // 更新组件
  }
  // 实例渲染 watcher
  new Watcher(vm, updateComponent);
}

export default Vue;