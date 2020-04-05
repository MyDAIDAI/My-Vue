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
