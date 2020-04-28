import {isPlainObject} from "../vue/util";

let Vue

class ModuleCollection {
	constructor(options) {
		this.register([], options)
	}

	register(path, rawModule) {
		let newModule = {
			_raw: rawModule,
			_children: {},
			state: rawModule.state
		}
		if (path.length === 0) {
			this.root = newModule
		} else {
			// 拿到path中的父节点
			let parent = path.slice(0, -1).reduce((root, current) => {
				return root._children[current]
			}, this.root)
			parent._children[path[path.length - 1]] = newModule
			console.log(path, parent)
		}
		if (rawModule.modules) {
			forEach(rawModule.modules, (moduleName, module) => {
				this.register(path.concat(moduleName), module)
			})
		}
	}
}
function installModules(store, rootState, path, rootModule) {
	if (path.length > 0) {
		let parent = path.slice(0, -1).reduce((pre, current) => {
			return pre[current]
		}, rootState)
		console.log('path', path, parent)
		Vue.set(parent, path[path.length - 1], rootModule.state)
		// parent[path[path.length - 1]] = rootModule.state
	}
	if (rootModule._raw.getters) {
		forEach(rootModule._raw.getters, (getterName, getterFn) => {
			Object.defineProperty(store.getters, getterName, {
				get: () => {
					return getterFn(rootModule.state)
				}
			})
		})
	}
	if (rootModule._raw.mutations) {
		forEach(rootModule._raw.mutations, (mutationName, mutationFn) => {
			let entry = store.mutations[mutationName] || (store.mutations[mutationName] = [])
			entry.push(() => {
				mutationFn.call(store, rootModule.state)
			})
		})
	}
	if (rootModule._raw.actions) {
		forEach(rootModule._raw.actions, (actionName, actionFn) => {
			let entry = store.actions[actionName] || (store.actions[actionName] = [])
			entry.push(() => {
				actionFn.call(store, store)
			})
		})
	}
	if (rootModule._children) {
		forEach(rootModule._children, (moduleName, module) => {
			installModules(store, rootState, path.concat(moduleName), module)
		})
	}
}
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
		this._modules = new ModuleCollection(options)
		installModules(this, s, [], this._modules.root)
		console.log('_modules', this._modules)
		// if (options.getters) {
		// 	forEach(options.getters, (getterName, getterFn) => {
		// 		Object.defineProperty(this.getters, getterName, {
		// 			get: () => {
		// 				return getterFn(s) // getterFn执行会添加向依赖中的数据添加 getter
		// 			}
		// 		})
		// 	})
		// }
		// if (options.mutations) {
		// 	forEach(options.mutations, (mutationName, mutationFn) => {
		// 		this.mutations[mutationName] = () => {
		// 			mutationFn.call(this, s)
		// 		}
		// 	})
		// }
		// if (options.actions) {
		// 	forEach(options.actions, (actionName, actionFn) => {
		// 		this.actions[actionName] = () => {
		// 			actionFn.call(this, s)
		// 		}
		// 	})
		// }
	}
	get state() {
		return this._vm.state
	}
	// get getters() {
	// 	console.log('vm', this._vm)
	// 	return this._vm
	// }
	commit(type) {
		this.mutations[type] && this.mutations[type].forEach(fn => fn())
	}
	dispatch(type) {
		this.actions[type] && this.actions[type].forEach(fn => fn())
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
