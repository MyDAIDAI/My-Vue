import {observe} from './index';
import { arrayPatchMethods, observerArray } from './array';
import Dep from './dep';

export function defineReactive(data, key, value) {
  observe(value)
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
      }
      console.log(key, dep)
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      value = newVal;
      dep.notify();
    }
  })
}
class Observe{
  constructor (data) {
    if (Array.isArray(data)) {
      data.__proto__ = arrayPatchMethods;
      observerArray(data);
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}
export default Observe;