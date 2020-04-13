import { observe } from './index';
const arrayProtoMethods = Array.prototype;
export const arrayPatchMethods = Object.create(arrayProtoMethods);
const patchMethods = [
  'push',
  'unshift',
  'sort',
  'reverse',
  'splice',
  'pop'
];
export function observerArray(arr) {
  for (let index = 0, len = arr.length; index < len; index++) {
    const item = arr[index];
    observe(item);
  }
}
export function dependArray(value) {
  for(let i = 0; i < value.length; i++) {
    let currentItem = value[i];
    currentItem.__ob__ && currentItem.__ob__.dep.depend();
    if (Array.isArray(currentItem)) {
      dependArray(currentItem); // 递归收集依赖
    }
  }
}
patchMethods.forEach(method => {
  arrayPatchMethods[method] = function (...args) {
    console.log('调用了数组的更新方法');
    let result = arrayProtoMethods[method].apply(this, args);
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.splice(2);
      default:
        break;
    }
    if (Array.isArray(inserted)) {
      observerArray(inserted); // 对传入的数据添加响应式
    }
    this.__ob__.dep.notify();
    return result;
  }
})