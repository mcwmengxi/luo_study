---
title: Vue3新特性
---

## Vue 3.0

### 1.Vue3.0改进

- 打包体积更小，渲染速度更快，内存优化
- 使用Proxy代替defineProperty实现响应式，重写了虚拟DOM的实现和Tree-Shaking
- Vue3可以更好的支持TypeScript

- 新特性

  - Composition API 组合API

    - setup函数
    - ref与reactive
    - watch 与 watchEffect
    - provide inject

  - 新的内置组件

    Fragment Teleport Suspense

  - 其他改变

    新的生命周期钩子

    data选项应始终被声明为一个函数

    移除keyCode支持作为v-on的修饰符

### 2. Vue3.0工程化

#### 2.1 用vue-cli创建

```
//使用vue3.0要确保@vue/cli版本在4.5.0以上
vue --version

//安装或者升级你的@vue/cli
yarn global add [package]
yarn global upgrade @vue/cli 

// 创建
vue create [project]
```

#### 2.2 Vite创建

新一代前端构建工具

优势：

- 轻量快速的热重载

- 极速的服务启动，使用原生 ESM 文件，无需打包!

- 按需加载，无需等整个程序编译完成。

  

  ```
  yarn create @vitejs/app [project]
  npm init @vitejs/app [project]
  npm init vite-app [project]
  
  ```
  
  

### 3.常用composition API

#### 3.1 setup

- Vue3的一个新配置项，是一个函数

- 所有的Composition API都要通过它才能使用

- 组件的数据、方法都要在setup中配置

- setup返回值

  - 若返回值时对象，那么对象里面的属性、方法都可以在模板中使用

  - 若返回值是渲染函数，那么可以自由设置渲染函数内容，且会覆盖组件模板中的内容
  
- 注意点

  1. 不要与Vue2配置混合使用，尤其是在ts语法里,有些无法输出内容

     - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
     - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
     - 如果有重名, setup优先。

  2. setup不能是async 函数，因为返回值是一个Promise对象，模板找不到return对象里面的属性。

     (后面也会介绍返回Promise实例的情况，但是需要通过Suspense和异步组件的支持)

#### 3.2 ref

- 将一个数据变为响应式。

- 在setup函数中创建一个包。含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>,`let name= ref('nangong')`,在js中操作数据，要使用xxx.value的形式，`name.value`,在模板中读取数据只需写上名字即可，不需.value,因为在解析模板的时候会自动加上value.在setup函数中，还要将数据return出来，不然模板访问不到。

- 接收的数据可以是基本类型，也可以是对象。

- 基本类型数据响应式原理依旧是靠Object。defineProperty()的get和set实现的

- 对象类型的数据：通过`let obj = ref({a:'a',b:'b'})`获取到的obj还是RefImpl引用对象，但`obj.value`却是一个Proxy对象，虽然这样也能将对象类型数据转换成响应式的，但他还是借用了reactive函数实现，一般不采用。

- 对于对象类型的数据，内部使用了Vue3的新函数reactive函数，它内部就是由Proxy实现的。

#### 3.3 reactive函数

- 针对<strong style="color:#DD5145">对象类型数据</strong>转换成响应式数据的一个新函数，基本类型数据还是使用ref函数
- `const proxyObj = reactive(sourceObj)`,将一个源对象变为一个代理对象(Proxy的实例对象，proxy对象)
- reactive函数转换的响应式数据是深层次的
- 内部基于ES6的Proxy实现，通过代理对象对源对象进行操作，并且这种操作能被Vue监听到(数据劫持)

#### 3.4 响应式原理

​	**1.Vue2中的响应式**

​	实现原理：

- 对象类型：通过Object.defineProperty()来对属性的读取修改进行拦截(数据劫持)

- 数组类型：通过重写更新数组的一系列方法来实现拦截

  ```
  Object.defineProperty(data, 'count', {
      get () {}, 
      set () {}
  })
  ```

​	存在问题：

- 新增、删除对象属性，无法触发视图更新
- 直接通过数组下标修改数组，无法触发视图

​	**2.Vue3中的响应式**

实现原理：**Proxy代理+Reflect反射**

通过Proxy代理对象拦截对象中任意数据的变化，包括：属性值的读写、属性的添加、属性的删除等。

通过Reflect反射对源对象的属性进行操作

```js
let p = new Proxy(person,{
    get(target,propName){
        // console.log(target,propName)//target -->person propName --> 要读取的属性名
        return Reflect.get(target,propName)
    },
    set(target,propName,value){
        console.log("检测到对象属性发生改变或是有新增属性,在此可以进行界面更新的实现")
        // 只是实现浅层的响应式，深层没有实现
        return Reflect.set(target,propName,value)
    },
    deleteProperty(target,propName){
        console.log("检测到对象属性被删除,在此可以进行界面更新的实现")
        return Reflect.deleteProperty(target,propName)
    }
})
```

#### 3.5 ref vs reactive

- 定义数据类型

  ref用来定义基本数据类型的数据

  reactive用来定义对象、数组类型的数据，基本数据类型使用只需将基本数据类型包装成对象类型的数据就行了

  注意：ref也可以用来定义对象、数组类型的数据，但它内部会自动使用reactive转换成Proxy对象

- 底层原理

  ref还是通过Object.defineProperty()的get与set来实现响应式(数据劫持)

  reactive是通过Proxy来实现响应式(数据劫持)，并通过Reflect来操作源对象的属性

- 使用

  ref定义的数据在进行数据操作时需要`.value`获取，在模板中读取数据直接使用就行了

  reactive定义的数据直接使用就行了

#### 3.6 setup细节

**setup执行时间**：在beforeCreate钩子函数执行前执行，且this为undefined

**setup接收参数：**

- <strong style="color:#DD5145">props </strong>

  组件外部传过来的数据，需要用props声明，如果不声明，就会放入context.attrs中，控制台也会报Warning

- <strong style="color:#DD5145">context上下文对象</strong>

  ​    context.attrs 值为Proxy实例对象,接收没有经过props配置声明的属性,相当于this.$attrs

  ​    context.slots 接收组件外传过来的插槽内容 ，相当于this.$slots

  ​    context.emit 用于触发(分发)自定义事件的函数,相当于this.$emit

#### 3.7 计算属性与监听

**1.computed函数**

与Vue2中computed配置功能一致

```js
        // 简写，只能监听对象属性的变化，不能监听自身
        // let fullName = computed(()=>{
        //     return person.firstName+"-"+person.lastName
        // })

        // 复杂写法，能监听自身属性的变化
        person.fullName = computed({
            get(){
                return person.firstName+"-"+person.lastName
            },
            set(value){
                const arr = value.split('-')
                person.firstName = arr[0]
                person.lastName = arr[1]
            }
        })
```

**2.watch函数**

与Vue2中watch配置功能一致

**两个小“坑”**：

-  监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。

- 监视reactive定义的响应式数据中某个属性时：deep配置有效。

```js
        // ref定义对象类型数据 要使用.value形式，它返回的是Proxy类型对象.
        // 直接对它objRef开启深度监听
        // 如果是基本类型数据，不需要.value，它返回的是具体的数据
        // watch(objRef.value,(newValue,oldValue)=>{
        //     console.log("ref定义对象类型数据发生变化",newValue,oldValue)
        // })
        watch(objRef.value,(newValue,oldValue)=>{
            console.log("ref定义对象类型数据发生变化",newValue,oldValue)
        },{deep:true})

		// 1.监听单个ref定义的响应式数据
        // watch(count,(newValue,oldValue)=>{
        //     console.log("count发生变化",newValue,oldValue)
        // })
        // 2.监听多个ref定义的响应式数据
        watch([msg,count],(newValue,oldValue)=>{
            console.log("msg或count发生变化",newValue,oldValue)
        })

        let person = reactive({
            name:'nangong',
            age:23,
            job:{
                j1:{
                    salary:10
                }
            }
        })
        // 3.监听reactive定义的响应式数据
        // 如果监听的是reactive定义的响应式数据，无法正确获取oldValue
        // 如果监听的是reactive定义的响应式数据，无法设置deep选项，它会被强制开启
        /*
        watch(person,(newValue,oldValue)=>{
            console.log("person对象发生变化",newValue,oldValue)
        },{
            immediate:true,
            deep:false
        })//deep的设置在此处无效
        */

        // 4.监听reactive定义的响应式数据的某个属性
        // watch(()=>person.name,(newValue,oldValue)=>{
        //     console.log("person对象name发生变化",newValue,oldValue)
        // })
        
        // 5.监听reactive定义的响应式数据的某些属性
        // watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
        //     console.log("person对象name或age发生变化",newValue,oldValue)
        // })

        //特殊情况,当监听reactive定义的响应式数据的某些属性或某个属性为对象时，deep:true才能开启深度监听
        watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
            console.log("person对象的某些属性或某个属性发生变化",newValue,oldValue)
        },{deep:true})//此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

**3.watchEffect()函数**

- watchEffect函数既要指明监听的属性，又要指明回调，但是它只监听回调中使用到的属性，回调开始会立即执行一次。

- watchEffect与computed有点像，但computed注重的计算结果，回调的返回值，而watchEffect更注重的是过程，回调的整个内容，它不用写返回值

```js
        // watchEffect()指定的回调中的属性一发生改变，就执行回调
        watchEffect(()=>{
            const x = count.value
            const y = person.name
            console.log("监听watchEffect函数回调中使用过的属性")
        })
```

#### 3.8 生命周期

![生命周期](https://i.loli.net/2021/11/07/VW9CGwtEpyFeaxP.png)

#### 3.9 自定义hook函数

1.本质上是一个函数，它对setup函数中使用的composition API进行封装，用来进行复用

2.类似于vue2中的mixin。自定义hook能够 复用代码, 让setup中的逻辑更清楚易懂。

#### 3.10 toRef和toRefs函数

- **toRef**：创建一个 ref 对象，其value值指向另一个**响应式对象**中的某个属性。

  `const name = toRef(person,'name')`，通过return方式将响应式对象中的某个属性单独提供给外部使用,简化代码书写。

- **toRefs:**`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

```js
        return{
            ...toRefs(person)
            // name:toRef(person,'name'),
            // age:toRef(person,'age'),
            // salary:toRef(person.job.j1,'salary')
        }
```

### 4.其他composition API

#### 4.1 shallowRef和shallowReactive函数

**shallowRef**：只处理基本数据类型的响应式，不处理对象类型的响应式,对象类型数据的属性后续也只能通过替换新的对象来改变

**shallowReactive**：浅层响应式，只处理对象最外层的响应式

如果对象数据的结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。

 如果对象数据的后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
        let count = shallowRef({
            x:0
        })

        let person = shallowReactive({
            name:'nangong',
            age:23,
            job:{
                j1:{
                    salary:10
                }
            }
        })
```

#### 4.2  readonly和shallowReadonly函数

**readonly**:将一个响应式数据变成只读的数据(深层次的)

**shallowReadonly**:将一个响应式数据(外层数据)变成只读的数据(浅层次的，对象响应式只有最外层才是可读的)

不希望数据被修改时使用

```js
     count = readonly(count)
     // person =  readonly(person)
     // 将一个响应式数据(外层数据)变成只读的数据(浅层次的，对象响应式只有最外层才是可读的)
     person = shallowReadonly(person)
```

#### 4.3 toRaw和markRaw函数

**toRaw**:将一个对象类型的响应式数据变为对应的普通对象，对普通对象操作无法引起视图更新。

```    person =  toRaw(person)```

**markRaw**：标记对象，使它不再是响应式对象，<span style="color:orange">但如果改变了这个对象，通过对其它属性操作更新视图，会把对象被改变的值重新渲染出来。</span>

- 有些值不应被设置为响应式的，例如复杂的第三方类库等。

-  当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

  ```js
  function addEmail() {
  	let email = {wy163:'@163.com',qq:'@qq.com'}
  	person.email = markRaw(email)
  }
  function updateEmail() {
  	person.email.wy163 = '1395568175@163.com'
  }
  ```


#### 4.4  customRef函数

创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。在将一个数据变成响应式数据的时候，增加需要的一些逻辑，例如对输入框进行双向绑定时进行防抖处理。

`customRef()`接收一个工厂函数`(track,trigger)=>{return{get(){},set(){}}}`,工厂函数接收track，trigger参数，返回一个带有get、set方法的对象

```vue
<template>
    <hr/>
    <input type="text" v-model="data">
    <h4>{{data}}</h4>

</template>

<script lang="js">
import { ref,reactive,toRefs,customRef } from 'vue'
export default {
    name:'demo',
    setup(){
        // let data = ref('')

        function myRef(value,delay){
            let timer=null
            return customRef((track,trigger)=>{
                return {
                    get(){
                        // 让Vue跟踪value这个返回值，否则无法更新视图
                        track()
                        return value
                    },
                    set(newValue){
                        if (timer) clearTimeout(timer)
                        // console.log(newValue);
                        timer = setTimeout(() => {             
                            value = newValue
                            // 告诉vue更新界面
                            trigger()
                        }, delay);
                    }
                }
            })
        } 

        return{
            data:myRef('hello',500)
        }
    }
}
</script>
```

#### 4.5  provider与inject

祖级组件与后代组件通信

**provide提供**：祖级组件提供数据

```js
import { ref,reactive,provide,toRefs } from 'vue'
setup(){
    provide('person',person)
}
```

**inject注入**：后代组件接收使用数据

```js
import { ref,toRefs,reactive,inject } from 'vue'
setup(){
    let person = inject('person')
}
```

#### 4.6 响应式数据判断

-  isRef: 检查一个值是否为一个 ref 对象

-  isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理

- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理

-  isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

```js
        console.log(isRef(count));// true
        console.log(isReactive(person));// true
        console.log(isReadonly(newPerson));// true
        console.log(isProxy(newPerson));// true
        console.log(isProxy(newPerson1));// true
```

### 5.Composition API 的优势

**1.Options API 存在的问题**

使用options api ，如果要更改需求，需要在data、computed、methods等配置项中更改.
<div style="width:100%;height:100%;overflow:hidden;">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:450px;height:370px;float:left" />
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;height:100%;float:right"/> 
</div>
**2.Composition API 的优势**
    能更优雅地组织我们的代码，让相关功能的代码更加有序的组织在一起。

<div style="width:100%;height:100%;overflow:hidden;">
    <div style="width:350px;height:340px;overflow:hidden;float:left">
        <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
    </div>
    <div style="width:400px;height:340px;overflow:hidden;float:right">
        <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
    </div>
</div>


### 6.Vue3新组件

#### 6.1 Fragment

- Vue3中模板可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中，与React的Fargment类似

- 这样能减少标签层级，一定程度上减少内存占用

#### 6.2 Teleport

​	Teleport组件是一个能将自身组件的html结构传送到指定位置的组件，组件内to属性就是要传送的位置，可以是标签，也可以是css选择器

```vue
        <teleport to='body' >
            <div v-if="isShow" class="mask">
                <div class="popup">
                    <p>teleport与 Vue components 一起使用</p>
                    <p>在同一目标上使用多个 teleport</p>
                    <button @click="isShow = false">关闭popup弹窗</button>
                </div>
            </div>
        </teleport>
```



#### 6.3 Suspense

- 等待异步组件载入时可以渲染一些额外内容，让应用有更好的用户体验

- Suspense组件可以接收两个插槽，一个是default一个是fallback(渲染一些额外内容)

- 使用

  1. 异步引入组件

     ```js
     // 动态引入
     import {defineAsyncComponent} from 'vue'
     const Child = defineAsyncComponent(() => import('@/component/Child'))
     ```

     

  2. suspose组件包裹，并配置好```default``` 与 ```fallback```

     ```vue
             <Suspense>
                 <template v-slot:default>
                     <Child />
                 </template>
                 <template v-slot:fallback>
                     <h4>组件载入中</h4>
                 </template>
             </Suspense>
     ```

### 7.其他

#### 7.1 全局API迁移

| 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                    |
| ------------------------- | --------------------------------------- |
| Vue.config.xxx            | app.config.xxx                          |
| Vue.config.productionTip  | <strong style="color:red">移除</strong> |
| Vue.component             | app.component                           |
| Vue.mixin                 | app.mixin                               |
| Vue.use                   | app.use                                 |
| Vue.directive             | app.directive                           |
| Vue.prototype             | app.config.globalProperties             |

#### 7.2 其他改变

- data应始终被声明为函数

- 过渡类名更改

  ```css
    - Vue2.x写法
      .v-enter,
      .v-leave-to {
        opacity: 0;
      }
      .v-leave,
      .v-enter-to {
        opacity: 1;
      }
  
    - Vue3.x写法
  
      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }
      
      .v-leave-from,
      .v-enter-to {
        opacity: 1;
      }
  ```

- 移除keyCode作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

- 移除`v-on.native`修饰符，Vue3中@click即为原生的点击事件

  ```vue
    - 父组件中绑定事件
      <my-component
        v-on:close="handleComponentEvent"
        v-on:click="handleNativeClickEvent"
      />
  
    - 子组件中声明自定义事件
      <script>
        export default {
          emits: ['close']
        }
      </script>
  ```

- 移除过滤器（filter）

  过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。
  
- Ref 获取DOM

  由于`V3`中不在存在`this`，所以`ref`的获取调整了

  **单个ref**

  ```
  <div ref="Qrcode" class="qr_codeode_url" />
  
  import { ref } from 'vue'
  
  export default {
    setup() {
      const Qrcode = ref(null)
      // 挂载后
  	onMounted(() => {
  		console.log(Qrcode.value)
  	})
      return {
        Qrcode
      }
    }
  }
  ```

  **循环中的ref**

  ```
  <div v-for="item in list" :ref="setItemRef"></div>
  
  import { onBeforeUpdate, onUpdated } from 'vue'
  
  export default {
    setup() {
      let itemRefs = []
      const setItemRef = el => {
        if (el) {
          itemRefs.push(el)
        }
      }
      onBeforeUpdate(() => {
        itemRefs = []
      })
      onUpdated(() => {
        console.log(itemRefs)
      })
      return {
        setItemRef
      }
    }
  }
  ```

  - `itemRefs`不必是数组：它也可以是一个对象，其`ref`可以通过迭代的`key`被设置
  - 如有需要，`itemRef`也可以是响应式的，且可以被侦听

- emits 自定义事件

  定义一个组件可以向其父组件触发的事件

  ```
  // 在子组件中
  <h1 @click="father">{{ msg }}</h1>
  
  export default {
  	name: 'HelloWorld',
  	props: {
  		msg: {
  			type: String,
  			default: ''
  		}
  	},
  	emits: ['close'],
  	setup(props, { emit }) {
  		const father = function() {
  			emit('close', 'child')
  		}
  		return {
  			father
  		}
  	}
  }
  
  // 在父组件中
  <HelloWorld :msg="msg" @click="fn" @close="fn2" />
  ```

  

- $nextTick 异步更新

  ```
  import { nextTick } from 'vue'
  
  nextTick(() => {
    // ...
  })
  ```

  

- hook 生命周期事件

  通过事件来监听组件生命周期中的关键阶段

  ```
  // V2的语法
  <template>
    <child-component @hook:updated="onUpdated">
  </template>
  
  // V3的语法
  <template>
    <child-component @vnode-updated="onUpdated">
  </template>
  
  // 驼峰写法
  <template>
    <child-component @vnodeUpdated="onUpdated">
  </template
  ```

  

### 8. vue-router

安装`npm i vue-router@next`

创建router/index.js

vue3.0中createRouter来创建路由实例，createWebHashHistory代表使用hash模式的路由。

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
// 创建路由实例
const router = createRouter({
    // 使用hash方式实现路由
    history:createWebHashHistory(),
    // 配置路由规则，写法和之前一样
    routes
})

export default router
```

在main.js中挂载

```
import router from './router'
createApp(App).use(router).mount("#app")
```

### 9. vuex

`main.js`

```js
import router from './store'

createApp(App).use(router).mount('#app')
```

vue3.0中createStore来创建vuex实例。

`store/index.js`

```js
import { createStore } from 'vuex'

// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
  },
  getters: {
    // vuex的计算属性
  }
})

```

#### 9.1 根模块用法

 `store/index.js`定义

```
import { createStore } from 'vuex'

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
// 创建vuex仓库并导出
export default createStore({
    state: {
        //数据
        username: 'nangong'
    },
    getters: {
        // vuex的计算属性'
        newName(state) {
            return state.username + '!!'
        }
    },
    mutations: {
        // 修改数据函数
        updateName(state) {
            return state.username = "mul-update nangong"
        }
    },
    actions: {
        //请求数据函数
        updateName(context) {
            setTimeout(() => {
                context.commit('updateName')
            }, 1000)

        }
    },
    modules: {
        //分模块
    }
})
```

组件中使用

```vue
<template>
    <h4>App</h4>
        <!-- 1. 使用根模块state的数据   -->
    <p>vuex中state数据：{{$store.state.username}}</p>
        <!-- 2. 使用根模块getters的数据   -->
    <p>vuex中getters数据：{{$store.getters.newName}}</p>
    <button @click="multationFun">修改state数据</button>

</template>

<script lang="js">
import {useStore} from 'vuex'
export default {
    name:'app',
    setup() {
        // 使用vuex仓库
        const store = useStore()
        // console.log(store);
        // 1. 使用根模块state的数据
        // console.log(store.state);
        // 2. 使用根模块getters的数据
        // console.log(store.getters);
        function multationFun() {
            // 3. 提交根模块mutations函数
            // store.commit('updateName')
            // 4. 调用根模块actions函数
            store.dispatch('updateName')
        }
        return{
            multationFun
        }
    }
}
</script>
<style lang="css">
</style>

```

#### 9.2 分模块的用法

- 存在两种情况

  - 默认的模块，`state` 区分模块，其他 `getters` `mutations` `actions` 都在全局。

  - 带命名空间 `namespaced: true` 的模块，所有功能区分模块，更高封装度和复用。


`store/index.js`定义

```js
import { createStore } from 'vuex'

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
// 创建vuex仓库并导出

// 定义的模块要在export 之前,否则会报错
// 默认的模块，state 区分模块，其他 getters mutations actions 都在全局
const moduleA = {
        state: () => {
            // 子模块state建议写成函数
            return {
                username: 'moduleA'
            }
        },
        getters: {
            changeUserName(state) {
                return state.username + "AAA"
            }
        }

    }
    //带命名空间 namespaced: true 的模块，所有功能区分模块，更高封装度和复用。
const moduleB = {
    // 带命名空间的模块
    namespaced: true,
    state: () => {
        return {
            username: 'moduleB'
        }
    },
    getters: {
        changeUserName(state) {
            return state.username + 'BBB'
        }
    },
    mutations: {
        updateUserName(state) {
            return state.username = "multation-update moduleB"
        }
    },
    actions: {
        updateUserName({ commit }) {
            setTimeout(() => {
                commit('updateUserName')
            }, 1000)
        }
    }
}
export default createStore({
    state: {
        //数据
        username: 'nangong',
        person: [
            { id: 1, name: 'tom', gender: '男' },
            { id: 2, name: 'lucy', gender: '女' },
            { id: 3, name: 'jack', gender: '男' }
        ]
    },
    getters: {
        // vuex的计算属性'
        newName(state) {
            return state.username + '!!'
        },
        getBoys(state) {
            return state.person.filter(item => item.gender === "男")
        }
    },
    mutations: {
        // 修改数据函数
        updateName(state) {
            return state.username = "mul-update nangong"
        }
    },
    actions: {
        //请求数据函数
        updateName(context) {
            setTimeout(() => {
                context.commit('updateName')
            }, 1000)

        }
    },
    modules: {
        //分模块
        moduleA,
        moduleB
    }
})
```

组件中使用

```vue
<template>
    <h4>App</h4>
        <!-- 1. 使用根模块state的数据   -->
    <p>vuex中state数据：{{$store.state.username}}</p>
        <!-- 2. 使用根模块getters的数据   -->
    <p>vuex中getters数据1：{{$store.getters.newName}}</p>
    <p>vuex中getters数据2：{{$store.getters['getBoys']}}</p>
    <button @click="multationFun">修改state数据</button>
    <hr/>

     <!-- 使用模块A的username -->
     <p>moduleA中username：{{$store.state.moduleA.username}}</p>
     <p>moduleA中username：{{$store.getters['changeUserName']}}</p>

     <hr/>
     <!-- 使用模块B的username -->
     <p>moduleB中username：{{$store.state.moduleB.username}}</p>
     <p>moduleB中username：{{$store.getters['moduleB/changeUserName']}}</p>
     <button @click="$store.commit('moduleB/updateUserName')">修改username</button>
     <button @click="$store.dispatch('moduleB/updateUserName')">异步修改username</button>
</template>
```

### 10.vuex持久化

- 让在vuex中管理的状态数据同时存储在本地。可免去自己存储的环节。
- 在开发的过程中，像用户信息（名字，头像，token）需要vuex中存储且需要本地存储。
- 再例如，购物车如果需要未登录状态下也支持，如果管理在vuex中页需要存储在本地。
- 我们需要category模块存储分类信息，但是分类信息不需要持久化。

安装`yarn add vuex-persistedstate`

在`src/store` 文件夹下新建 `modules` 文件，在 `modules` 下新建`category.js`, `user.js` 和 `cart.js`

使用vuex-persistedstate插件来进行持久化

```js
import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
    modules: {
        user,
        cart,
        category
    },
    plugins: [
        createPersistedstate({
            key: 'erabbit-pc-vue3-store',
            paths: ['user', 'cart']
        })
    ]
})
```

**注意：**

===> 默认是存储在localStorage中

===> key是存储数据的键名

===> paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如`user.token`

===> 修改state后触发才可以看到本地存储数据的的变化。