import Vue from 'vue'
import store from './store'
let vm = new Vue({
	el: '#app',
	store,
	// render(h) {
	// 	return h('div', {id: 'container'},
	// 		'count: ' + this.$store.state.count,
	// 		'sdfsdfsdf'
	// 		// h('button', {
	// 		// 	// on: {
	// 		// 	// 	click: this.clickHandler
	// 		// 	// }
	// 		// }, '点击')
	// 		)
	// },
	methods: {
		clickHandler() {
			// this.$store.commit('incrementCount1')
			this.$store.dispatch('incrementAction')
		}
	}
})
//
// let vm = new Vue({
//   el: '#app',
//   render(h) {
//     return h('div', {id: 'container', class: 'name'},
//       '数组' + JSON.stringify(this.arr),
//       '对象' + JSON.stringify(this.people),
//     );
//   },
//   data () {
//     return {
//       msg: 'hello',
//       people: {
//         name: '张三',
//         age: 23
//       },
//       arr: [[1, 2], {a:1}],
//       firstName: 'zhang',
//       lastName: 'san'
//     }
//   },
//   computed: {
//     fullName () {
//       return this.firstName + this.lastName;
//     }
//   },
//   watch: {
//     arr: {
//       handler (newVal, oldValue) {
//         console.log('arr watch', newVal, oldValue);
//       },
//       deep: true
//     }
//   }
// })
// setTimeout(()=> {
//   // debugger
//   console.log('vm', vm)
//
//   vm.arr[1]['a'] = 'sss'
//   // vm.$set(vm.arr[3], 'a', '333')
//   // vm.$set(vm.arr, 1, "sdfsdf")
//   // vm.$delete(vm.people, 'name')
//   // console.log('vm', vm)
//   // vm.people.school = '123123'
// }, 1000)
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
