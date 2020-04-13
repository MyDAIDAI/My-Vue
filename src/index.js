import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  render(h) {
    return h('div', {id: 'container', class: 'name'},
      '数组' + JSON.stringify(this.arr),
      '对象' + JSON.stringify(this.people),
    );
  },
  data () {
    return {
      // msg: 'hello',
      people: {
        name: '张三',
        age: 23
      },
      arr: [[1, 2], 2, 3, {a:1}],
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
setTimeout(()=> {
  // console.log('$set', vm.$set)
  // vm.$set(vm.arr, 1, "sdfsdf")
  vm.$set(vm.people, 'school', '李四学习')
  console.log('vm', vm)
  // vm.people.school = '123123'
}, 1000)
// setTimeout(() => {
//   vm.firstName = 'li'
// }, 1000);
// let oldVnode =  h('div', {id: 'container', class: 'name'}, 
//     h('li', {style: {color: 'red'}, key: 'a'}, 'a'),
//     h('li', {style: {color: 'red'}, key: 'b'}, 'b'),
//     h('li', {style: {color: 'red'}, key: 'c'}, 'c'),
//     h('li', {style: {color: 'red'}, key: 'd'}, 'd')
//     // 'world'
//   )
// let container = document.getElementById('app')
// render(oldVnode, container)
// let newVnode =  h('div', {id: 'container', class: 'name'},
//     h('li', {style: {color: 'red'}, key: 'd'}, 'd'),
//     h('li', {style: {color: 'red'}, key: 'e'}, 'e'),
//     h('li', {style: {color: 'red'}, key: 'a'}, 'a'),
//     h('li', {style: {color: 'red'}, key: 'f'}, 'f'),
//     h('li', {style: {color: 'red'}, key: 'c'}, 'c')
//     // 'world'
//   )
// setTimeout(() => {
//   patch(oldVnode, newVnode);
// }, 1000)
