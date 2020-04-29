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
1. `vuex`导入，安装以及实例
2. 通过`this.$store.state.count1`来使用变量
3. 通过`this.$store.getter.allCount`来使用计算属性
4. 通过`this.$store.commit('incrementCount1')`来调用`mutations`中的`incrementCount1`来修改`state`中的值
5. 通过`this.$store.dispatch('incrementAction')`来调用`action`中的`incrementAction`函数来调用`mutations`中的函数来异步修改其中的值

那么我们现在就按照顺序一步一步的来实现

1. `vuex`的导入，安装以及实例
在使用`vuex`时需要调用`Vue.use(vuex)`来进行安装，调用`Vue.set()`就会调用`vuex`内部的`install`函数，在这个函数中可以执行想要的操作

我们一般都是在各个组件中通过`this.$store`来进行调用的，那么`vuex`中的`store`是怎么被绑定到每个组件中的`this`上的呢？这就是在`install`中进行绑定的,在这个函数中使用了`mixin`函数来进行混入，并且在`beforeCreate`中绑定到`this`上，代码如下
```js
let Vue
function install(_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate() {
      //  有 options 选项，表明是 根实例，向上面添加 $store 属性
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
       // 不是 根实例，则直接拿取 父组件 中的 $store 
        this.$store = this.$parent.$store
      }
    }
  })
}
```
进一步，使用`vuex`
```js
const store = new Vuex.Store({
  // ...some props
})
```
声明`Store`类
```js
function forEach(obj, callback) {
  Object.keys(obj).forEach(key => callback(key, obj[key]))
}
class Store {
  constructor(options) {
  	this.state = options.state
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    if (options.getters) {
      forEach(options.getters, (getterName, getterFn) => {
        this.getters[getterName] = getterFn(this.state)
      })
    }
    if (options.mutations) {
      forEach(options.mutations, (mutationName, mutationFn) => {
        this.mutations[mutationName] = () => {
          mutationFn(this.state)
        } 
      })
    }
    if (options.actions) {
      forEach(options.actions, (actionName, actionFn) => {
        this.actions[actionName] = () => {
          actionFn(this.state)
        }
      })
    }
  }
  commit(type) {
    this.mutations[type] && this.mutaions[type]()
  }
  dispatch(type) {
    this.actions[type] && this.actions[type]()
  }
}
```
上面的代码实现了一个基本的`Store`类，可以把数据渲染到页面上，但是当我们进行操作修改的时候，页面上并不会进行更新，这是因为`Store`中的`state`对象中的数据并不是响应式的，那么怎么修改为响应式的呢？在源码中，借用了`Vue`实例中的`data`属性

将上面类中对`state`的操作进行以下修改
```js
class Store {
  constructor(options) {
    let state = options.state
    this._vm = new Vue({
      data: {
        state
      }
    })
    //...other code
  }
  get state() {
    return this._vm.state
  }
}
```
上面实现了`state`中的响应式，那么`getter`中的响应式是怎么实现的呢
```js
class Store {
  constructor(options) {
    // other code
    this.getters = {}
    if (options.getters) {
      forEach(options.getters, (getterName, getterFn) => {
        Object.defineProperty(this.getters, getterName, {
          get: () => {
            return getterFn(this.state)
          }
        })
      })
    }
    // some code
  }
}
```
在调用`this.$store.getters.allCount`时，会进入到其中的`getter`函数，执行`getterFn`函数，在执行这个函数时，会触发`state`中相应数据的`get`方法，然后在`get`方法中添加当前`getters.getterName`的依赖

当修改`getters`中某个`state`中的属性值，其`state`中的属性会触发其中的`set`函数，进行依赖派发，实现依赖更新

## `module`
