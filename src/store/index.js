import Vuex from '../../source/vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count1: 0,
		count2: 0
	},
	getters: {
		allCount (state) {
			return state.count1 + state.count2
		}
	},
	mutations: {
		incrementCount1(state) {
			return state.count1++
		}
	},
	actions: {
		incrementAction(store) {
			store.commit('incrementCount1')
			// setInterval(() => {
			// 	store.commit('incrementCount1')
			// }, 1000)
		}
	}
})
export default store
