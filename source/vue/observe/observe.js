import {observe} from './index';
import { arrayPatchMethods, observerArray, dependArray } from './array';
import Dep from './dep';

export function defineReactive(data, key, value) {
  let childObj = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
        if (childObj) {
          childObj.dep.depend();
          if(Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      observe(newVal);
      value = newVal;
      dep.notify();
    }
  })
}
class Observe{
  constructor (data) {
    this.dep = new Dep();
    this.value = data;
    Object.defineProperty(data, '__ob__', {
      get: () => {
        return this;
      }
    })
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