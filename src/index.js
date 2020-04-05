import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      people: {
        name: '张三',
        age: 23
      },
      arr: [1, 2, 3, {a:1}]
    }
  },
  computed: {},
  watch: {}
})
// 使用 push 等方法对数组进行修改时没有触发 setter 方法
// 拦截数组中的修改方法

// console.log('vm', vm.arr[3].a)