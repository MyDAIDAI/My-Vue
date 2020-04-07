import Vue from 'vue'
import h from '../source/vue/vdom/h'
import render from '../source/vue/vdom/patch'

let vm = new Vue({
  el: '#app',
  data () {
    return {
      // msg: 'hello',
      // people: {
      //   name: '张三',
      //   age: 23
      // },
      // arr: [[1, 2], 2, 3, {a:1}]
      firstName: 'zhang',
      lastName: 'san'
    }
  },
  computed: {
    fullName () {
      return this.firstName + this.lastName;
    }
  },
  // watch: {
  //   msg: function (newVal, oldValue) {
  //     console.log('msg watch', newVal, oldValue);
  //   }
  // }
})
setTimeout(() => {
  vm.firstName = 'li'
}, 1000);
let oldVnode =  h('div', {id: 'container', class: 'name'}, 
    h('span', {style: {color: 'red'}}, 'hello'),
    'world'
  )
let container = document.getElementById('app')
render(oldVnode, container)

console.log('oldVnode', oldVnode)