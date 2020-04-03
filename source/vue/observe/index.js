import Observe from './observe'
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
  new Observe(data)
}
function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  observe(vm._data)
}
function initComputed(vm) {}
function initWatch(vm) {}