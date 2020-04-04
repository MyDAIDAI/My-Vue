import {initState} from './observe/index';
function Vue(options) {
  this._init(options);
}
Vue.prototype._init = function (options) {
  // vue初始化
  let vm = this;
  vm.$options = options;

  // 需要将数据重新初始化
  initState(vm);
}


export default Vue;