import Observe from './observe';
export function initState(vm) {
  // 对传入的不同属性进行初始化  data computed watch
  let opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}
export function observe(data) {
  if (typeof data !== 'object' || data == null) return;
  if (data.__ob__) {
    return data.__ob__;
  }
  return new Observe(data);
}
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    }
  })
}
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  for(let key in vm._data) {
    proxy(vm, '_data', key);
  }
  observe(vm._data);
}
function initComputed(vm) {}
function initWatch(vm) {}