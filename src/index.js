import Vue from 'vue'
import h from '../source/vue/vdom/h'
import render, {patch} from '../source/vue/vdom/patch'
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
// setTimeout(() => {
//   vm.firstName = 'li'
// }, 1000);
let oldVnode =  h('div', {id: 'container', class: 'name'}, 
    h('li', {style: {color: 'red'}, key: 'a'}, 'a'),
    h('li', {style: {color: 'red'}, key: 'b'}, 'b'),
    h('li', {style: {color: 'red'}, key: 'c'}, 'c'),
    h('li', {style: {color: 'red'}, key: 'd'}, 'd')
    // 'world'
  )
let container = document.getElementById('app')
render(oldVnode, container)
let newVnode =  h('div', {id: 'container', class: 'name'},
    h('li', {style: {color: 'red'}, key: 'd'}, 'd'),
    h('li', {style: {color: 'red'}, key: 'a'}, 'a'),
    h('li', {style: {color: 'red'}, key: 'b'}, 'b'),
    h('li', {style: {color: 'red'}, key: 'c'}, 'c')
    // 'world'
  )
setTimeout(() => {
  patch(oldVnode, newVnode);
}, 1000)

console.log('oldVnode', oldVnode)