import {observe} from './index';
import { arrayPatchMethods, observerArray } from './array';

export function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('getter', key);
      return value;
    },
    set(newVal) {
      console.log('setter', key);
      if (newVal === value) return;
      value = newVal;
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