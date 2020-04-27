let Vue
class Store {
	constructor(options) {
		let s = options.state
		this.getters = {}
		this.mutations = {}
		this.actions = {}
		// 借用 vue 中对 data 响应式的处理 实现 state 的响应式
		this._vm = new Vue({
			data: {
				state: s
			},
			// computed: options.getters
		})
		if (options.getters) {
			forEach(options.getters, (getterName, getterFn) => {
				this.getters[getterName] = getterFn(this.state)
			})
		}
		if (options.mutations) {
			forEach(options.mutations, (mutationName, mutationFn) => {
				this.mutations[mutationName] = mutationFn
			})
		}
		if (options.actions) {
			forEach(options.actions, (actionName, actionFn) => {
				this.actions[actionName] = actionFn
			})
		}
	}
	get state() {
		return this._vm.state
	}
	// get getters() {
	// 	console.log('vm', this._vm)
	// 	return this._vm
	// }
	commit(type) {
		this.mutations[type] && this.mutations[type](this.state)
	}
	dispatch(type) {
		this.actions[type] && this.actions[type](this)
	}
}
function forEach(obj, callback) {
	let keys = Object.keys(obj)
	keys.forEach(key => {callback(key, obj[key])})
}
function install (_Vue) {
	Vue = _Vue
	// 混入 $store, 实现所有文件内可用
	Vue.mixin({
		beforeCreate() {
			if (this.$options && this.$options.store) {
				this.$store = this.$options.store // 根组件中中传入了 store, 则直接添加 $store
			} else {
				this.$store = this.$parent && this.$parent.$store // 子组件中没有传入 store, 则从父组件中获取
			}
		}
	})
}

export default {
	Store,
	install
}
