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
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    observe(item);
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
    observerArray(inserted); // 对传入的数据添加响应式
    return result;
  }
})