import {pushStack, popStack} from './dep';
let id = 0;
class Watcher {
  constructor(vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.deps = [];
    this.depIds = new Set();
    this.cb = cb;
    this.opts = opts;
    this.id = id++;
    this.get();
  }
  get() {
    pushStack(this);
    this.getter();
    popStack();
  }
  update() {
    // 每改一次进行一次 watcher 的执行，性能较差，使用异步批量更新
    // 待同步所有赋值操作执行完成后，再进行更新
    console.log('update', this.id)
    queueWatcher(this);
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depIds.has(id)) {
      this.deps.push(dep);
      this.depIds.add(id);
      dep.addSub(this);
    }
  }
  run() {
    console.log('run');
    this.get();
  }
}



let queue = [];
let has = {};

// 刷新 watcher
// 遍历 queue，执行里面的 watcher 
// 重置队列 queue
function flushWatcher() {
  queue.forEach(watcher => watcher.run());
  queue = [];
  has = {};
}
// watcher队列，保存需要执行的 watcher 
// 确保 wacher 不会被重复执行
function queueWatcher(watcher) {
  let id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
  }
  // 确保异步执行
  nextTick(flushWatcher);
}


// cb 可能等于 flushWatcher 也可能为用户使用 Vue.nextTick(() => {}) 传入的回调函数，
// 用户传入的回调函数需要后于 flushWatcher 执行
let callbacks = [];
function flushCallbacks() {
  callbacks.forEach(cb => cb());
}
function nextTick(cb) {
  // 将回调函数收集起来
  callbacks.push(cb);

  // 使用异步方法保存回调函数，进行异步执行
  // 微任务 Promise  MutationObserver
  // 宏任务 setImmediate setTimeout

  let timerFun = () => {
    flushCallbacks();
  }
  if (Promise) {
    return Promise.resolve().then(timerFun);
  }
  if (MutationObserver) {
    let observe = new MutationObserver(timerFun);
    let textNode = document.createTextNode(1);
    observe.observe(textNode, {characterData: true});
    textNode.textContent = 2;
    return;
  }
  if (setImmediate) {
    return setImmediate(timerFun);
  }
  setTimeout(timerFun);
}

export default Watcher;