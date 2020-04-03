import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      school: {
        name: 111,
        age: 234
      },
      arr: [1, 2, 3]
    }
  },
  computed: {},
  watch: {}
})
console.log('vm', vm)