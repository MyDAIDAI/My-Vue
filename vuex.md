# `vuex`原理

## 简单版`vuex`实现
在实现`vuex`之前，先熟悉一下相关的使用
初始化使用`vuex`
```js
import vuex from 'vuex'
import Vue from 'vue'
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    count1: 1,
    count2: 2
  },
  getters: {
    allCount(state) {
    	return state.count1 + state.count2
    }
  },
  mutations: {
    incrementCount1 (state) {
      return state.count1++
    }
  },
  actions: {
    incrementAction(store) {
      setTimeout(() => {
        store.commit('incrementCount1')
    })
  }
 }
})
```
`html`中使用
```html
<div id="app">
    <div>{{$store.getters.allCount}}</div>
    <div>{{$store.state.count1}}</div>
    <div>{{$store.state.count2}}</div>
    <button @click="clickHandler">点击</button>
  </div>
```
修改`store`中的`state`的值
```js
import Vue from 'vue'
new Vue({
  el: '#app',
  methods: {
    clickHandler () {
      this.$store.commit('incrementCount1')
      this.$store.dispatch('incrementAction')
    }
  }
})
```

上面的过程可以简单概况为下面几步
- `vuex`导入，安装以及实例
- 通过`this.$store.state.count1`来使用变量
- 通过`this.$store.getter.allCount`来使用计算属性
- 
