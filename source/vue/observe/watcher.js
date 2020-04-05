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
    this.get();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depIds.has(id)) {
      this.deps.push(dep);
      this.depIds.add(id);
      dep.addSub(this);
    }
  }
}
export default Watcher