import {isPlainObject} from '../util';
import Vue from '../index';
const seenObjects = new Set();
export default function traverse(value) {
  _traverse(value, seenObjects);
  seenObjects.clear();
}
function _traverse(value, seen) {
  // 1. 不是数组或者对象
  // 2. 对象被 freeze
  // 3. 对象是一个 
  if ((!Array.isArray(value) && !(isPlainObject(value))) || Object.isFrozen(value)) {
    return
  }
  const ob = value.__ob__;
  if (ob) {
    const depId = ob.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      const item = value[index];
      _traverse(item, seen);
    }
  } else {
    const keys = Object.keys(value);
    for (let index = 0; index < keys.length; index++) {
      const item = keys[index];
      _traverse(value[item], seen);
    }
  }
}