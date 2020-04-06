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
      arr: [[1, 2], 2, 3, {a:1}]
    }
  },
  computed: {},
  watch: {}
})
setTimeout(() => {
  // vm.msg = '123123'
  // vm.msg = '12'
  // vm.msg = 'hello'
  // vm.msg = 'world'
  vm.arr[0].push(3)
  console.log('vm', vm)
}, 1000);