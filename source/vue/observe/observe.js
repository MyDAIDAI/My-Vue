import {observe} from './index'
export function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      // console.log('getter', data, key)
      return value
    },
    set(newVal) {
      // console.log('setter', data, key, newVal)
      if (newVal === value) return
      value = newVal
    }
  })
}
class Observe{
  constructor (data) {
    this.walk(data)
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      let value = data[key];
      defineReactive(data, key, value)
    }
  }
}
export default Observe