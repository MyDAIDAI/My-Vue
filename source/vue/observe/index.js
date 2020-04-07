import Observe from './observe';
import Watcher  from './watcher';
import Dep from './dep';
export function initState(vm) {
  // 对传入的不同属性进行初始化  data computed watch
  let opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
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
function createComputedGetter(vm, key) {
  let watcher = vm._computedWatchers[key];
  return () => {
    // 如果 dirty 为 true, 则需要进行求值
    if (watcher.dirty) {
      watcher.evaluate()
    }
    if (Dep.target) {
      watcher.depend()
    }
    return watcher.value;
  }
}
function initComputed(vm, computed) {
  let watchers = vm._computedWatchers = Object.create(null);
  for(let key in computed) {
    let userDef = computed[key];
    watchers[key] = new Watcher(vm, userDef, () => {}, {lazy: true});
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    })
  }
}
function createWatcher(vm, key, handler) {
  return vm.$watch(key, handler);
}
function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let key in watch) {
    let handler = watch[key];
    createWatcher(vm, key, handler);
  }
}