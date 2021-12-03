---
title: Vue3补充
---

# 基础语法篇
## Vue实例

动态引入
<script src="https://unpkg.com/vue@next"></script>
```javascript
<body>
    <div class="" id="app">
        {{message}}
    </div>
    <script type='text/javascript'>
        // 了解整个Vue3对象
        // console.log(Vue);
        const {createApp} = Vue
        const attr = {
            data:()=>{
                return{
                    message:"hello world"
                }
            }
        }
        // 了解实例对象
        // console.log(createApp(attr));
        //创建实例，挂载在dom容器中
        createApp(attr).mount('#app')
    </script>
</body>
```

## mvvm设计模式
- Vue将程序中数据、模板关联在一起，并挂载到真实dom上，展示到视图中
- m代表model数据，v代表View视图，vm代表ViewModel视图数据连接层，将数据与视图连接起来
```javascript
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: 'jspang.com'   //1.在这里定义了数据，也就是`model`数据
            }
        },
        template: "<h2>{{message}}</h2>" //2.在这里定义了模板，也就是`view`，
        //定义后的自动关联，就叫做`vm`，viewModel数据视图连接层。
    })
    app.mount("#app")
</script>

```

### 事件绑定
**事件修饰符**
`stop,prevent,capture,self,once,passive`
在Vue中要停止冒泡是非常简单的，只要加加一个事件修饰符stop就可以了。
prevent修饰符：阻止默然行为的修饰符，这个以前讲过，例如阻止form表单的默认提交行为。
capture修饰符：改成捕获模式，默认的模式都是冒泡模式，也就是从下到上，但是你用capture后，是从上到下的。
passive修饰符：解决滚动时性能的修饰符

**事件绑定中的按键修饰符和鼠标修饰符**
按键修饰符`enter 、tab、delete、esc、up 、down、left、right`
按下回车键时触发表达提交   `<input @keydown.enter="handleKeyDown"/>`

鼠标修饰符`left、right、middle`
按下鼠标右键时弹出选项菜单 @click.right

## v-model数据双向绑定

**v-model数据双向绑定的修饰符**
- lazy修饰符 当数据输入完成后，失去焦点再进行改变。
```html
<div>
    {{message}}<input v-model.lazy="message" />
</div> 
```
- number修饰符：<input />输入的内容无论是数字还是字母，最终都会变为字符串。如果想最终输入的变成数字，你就可以使用number修饰符了。但如果是字符串还是会变成字符串形式。
```html
<div>
    {{typeof message}}<input v-model.number="message" />
</div>
```
- trim修饰符：它是用来消除input框输入内容前后的空格的。


# 组件篇

## 组件编写潜规则
局部组件采用大驼峰命名法，在注册组件时，要使用这种形式（用-切割单词），由于变量中不能使用-,而组件调用确实可以的
## 组件props传值的验证

对用户输入进行验证
- 对类型的验证
  Vue支持的校验类型包括:String、Boolean、Array、Object、Function和Symbol。
```javascript
    app.component('Son', {
        props: {
            name: String
        },
        template: `<div>{{name}} div </div>`
    })

```
- 必填验证和默认值
  required:ture,组件使用时必须传参
  default默认值
```javascript
    app.component('Son', {
        props: {
            name: {
                type:String,
                required:true,
                default:''
            }
        },
        template: `<div>{{name}} div </div>`
    })
```

- 精准校验validator

## 组件机制-单向数据流
- 数据从父级组件传递给子组件，只能单向绑定。子组件内部不能直接修改从父组件传递过来的数据。
- 降低组件的耦合度和独立性

## 组件Non-props和inheritAttrs属性
- Non-props属性: 父组件向子组件传值时，子组件没有任何的接收方法像props这种，然后父组件就会把他携带的属性，原封不动的复制给子组件的根节点。
- 如果有多个节点，可以增加一个根节点，也可以使用`v-bind="$attrs"`接收全部，或`v-bind="$attrs.style"`接收单个,也可以在生命周期中使用。
- inheritAttrs属性：让Non-props属性不起作用，不影响props接收值
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div class="" id="app"></div>
    <script type='text/javascript'>
        const {createApp} = Vue

        // 父组件自动把属性复制给子组件
        const app = createApp({
            data:()=>{
                return{
                    msg:"main组件"
                }
            },
            template:`
            <h2>{{msg}}</h2>
            <Com style="color:red" msg="com组件" class="active" text="text内容" />`

        })
        // inheritAttrs 让style标签就不会再被复制到子组件，让样式不起作用
        app.component('Com',{
            props:{
                msg:String,
                text:String
            },
            // inheritAttrs:false,
            template:`<h1 v-bind="$attrs">{{msg}}--{{text}}</h1>
            <h1 v-bind:style="$attrs.style">{{msg}}--{{text}}</h1>
            <h1>{{msg}}--{{text}}</h1>`
        })
        app.mount('#app')
        </script>
</body>
</html>
```

## 组件通过事件进行通信$emit

- 子组件触发父组件事件时可以传递参数并借此来进行通信
- 子组件传递参数时，可以通过emits选项来校验

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div class="" id="app">

    </div>
    <script type='text/javascript'>
        // 了解整个Vue3对象
        // console.log(Vue);
        const {createApp} = Vue
        const app = createApp({
            template:`
            <h1>计数器</h1>
            <counter :count="count" @add="handleAdd"  @dec="handleDec" />`,
            data(){
                return{
                    count:0
                }
            },
            methods:{
                handleAdd(num){
                    this.count=num
                },
                handleDec(num){
                    this.count=num
                }
            }
        })
        app.component('counter',{
            props:{
                count:Number
            },
            emits:{
                add:(value)=>{
                    return value<20?true:false
                },
                dec:(value)=>{
                    return true
                }
            },
            methods:{
                add(){
                    // console.log(this);
                    this.$emit('add',this.count+2)
                },
                dec(){
                    this.$emit('dec',this.count-2)
                }
            },
            template:`
            <button @click="dec">-</button>
            {{count}}      
            <button @click="add">+</button>
            `
        })
        app.mount('#app')
    </script>
</body>
</html>
```

## 作用域插槽
- 子组件传递：子组件使用`:`传递给父组件，比如`:item="item"`
- 父组件接收：使用props接收子组件传入的值，props传过来的数据是对象，要获取它的value，可以通过props.value,也可以使用es6解构赋值方法简写

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div class="" id="app"></div>
    <script type='text/javascript'>
        const {createApp} = Vue
        // 父组件
        const app = createApp({
            template:`
            <h2>main组件</h2>
            <p>props传过来的数据是对象，要获取它的value</p>
            <list v-slot="props" >
                <div>{{props.item}}--{{props}}
                </div>
            </list>`

        })
        // 子组件
        app.component('list',{
            data(){
                return{
                    fruits:{
                        "apple":"苹果",
                        "banner":"香蕉",
                        "orange":"橘子"
                    }
                }
            },
            template:`
            <div>
                <slot v-for="item in fruits" :item="item"></slot>    
            </div>`
        })
        app.mount('#app')
        </script>
</body>
</html>
```

## 动态组件

通过按钮切换动态组件
按钮绑定一个方法用来控制两个组件的值的切换，实例注册两个组件,通过`<component :is="chooseItem" />`控制哪个组件显示
如果组件是`input`框，使用`keep-alive`组件保存组件状态.

```vue
    <keep-alive>
        <component :is="showItem" />
    </keep-alive>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div class="" id="app"></div>
    <script type='text/javascript'>
        const {createApp} = Vue

        // 父组件自动把属性复制给子组件
        const app = createApp({
            data:()=>{
                return{
                    msg:"选择式神",
                    chooseItem:"ssr"
                }
            },
            methods: {
                choose(){
                    this.chooseItem = this.chooseItem == "ssr" ? "sp":"ssr"
                }
            },
            template:`
            <h2 >{{chooseItem}}辉夜姬</h2>
            <button @click="choose">切换式神</button>
            <component :is="chooseItem" />`

        })

        app.component('sp',{
            template:`<img src="https://yys.res.netease.com/pc/fab/20211118141214/img/6_474_e17ed679-5296-44a9-8296-89f7fdd15322_ad64bd5.png"/>`
        })
        app.component('ssr',{
            template:`<img src="https://yys.res.netease.com/pc/fab/20211118141214/img/6_474_05056449-b921-4f72-b929-f2865656f968_83c5440.png"/>`
        })
        app.mount('#app')
        </script>
</body>
</html>
```

## 异步组件
defineAsyncComponent 可以从 vue 中导入，组件懒加载
defineAsyncComponent的最简单用法，接收一个返回promise的工厂函数，成功回调在服务端返回后并且在组件定义后调用，失败回调表示加载失败。
```javascript
    app.component('async-component',Vue.defineAsyncComponent(()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({
                    template:`<span>异步组件</span>`
                })
            },2000)
        })
    }))
```
defineAsyncComponent的高级用法，接收一个对象
```javascript
const AsyncPopup = defineAsyncComponent({ 
  loader: () => import("./LoginPopup.vue"),
   // 加载异步组件时要使用的组件
  loadingComponent: LoadingComponent,
   // 加载失败时要使用的组件
  errorComponent: ErrorComponent, 
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 1000, 
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000 
})
```

# 动画与过渡篇
## 动画与过渡
- 动画：一个DOM元素，从一个地方移到另一个地方，这种效果叫做动画。比如一个层从浏览器的左侧移动到右侧，这就是动画。
- 过渡：是DOM元素中的一个属性，缓慢的变成另一个属性，这种效果叫做过渡效果。比如一个层从红色慢慢变成黄色，这种就是过渡。

## Vue3动画与过渡效果
**css实现动画效果**
- 使用`transition`标签包裹要进行动画与过渡效果的标签，用固定的css样式(通过`transition`标签的name属性确定样式名称)控制动画与过渡效果
- 也可以使用自定义的css样式,直接加在`transition`标签身上就行了。
```vue
    <transition name="fade">
        <div v-if="isShow">动画与过渡</div>
    </transition>
```
```css
/* 动画效果实现 */
.fade-enter-active{
    animation:enter 2s ease;
}
.fade-leave-active{
    animation:leave 2s ease;
}
@keyframes enter{
    0%{
        transform:translateX(-100px)
    }
    100%{
        transform:translateX(50px)
    }
}
@keyframes leave{
    0%{
        transform:translateX(50px)
    }
    100%{
        transform:translateX(-100px)
    }
}
/* 过渡效果实现 */
.fade-enter-from,.fade-leave-to{
    opacity:0
}
.fade-enter-to,.fade-leave-from{
    opacity:1;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
}
```

- animate.css动画库的使用
  - 在要进行动画的元素上`transition`加上自定义样式`class="animate__animated animate__heartBeat"`
  - 如果过渡与动画一起使用,过渡与动画时长不一致。
    可以在`transition`加上`type="animate`,以动画时长为依据，动画时长一结束，整个过程结束
    也可以加上`:duration="1000"`,通过给定时长控制动画与过渡结束，对象写法`:duration="{enter:1000,leave:3000}"`
```
<transition appear type="animate" duration="1000" class="animate__animated animate__heartBeat">
    <div v-if="isShow">动画与过渡</div>
</transition>
```
**js实现动画效果**
- 在`transition`标签身上添加`:css="false`禁用css动画
- 使用Vue提供的一些钩子函数,能在某一时刻自动执行。
  - 入场动画钩子函数
    * before-enter 在动画开始前执行的函数
    * enter 动画进入执行的函数，done参数通知执行下一个钩子函数after-enter,如果不通知无法进入下一个钩子函数
    * after-enter 在动画结束后执行的函数,然后利用enter钩子中的done进行通知它动画执行结束。
  
```js
// 钩子函数
    <transition :css="false" @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter">
        <div v-if="isShow">动画与过渡</div>
    </transition>
// 钩子函数绑定方法实现
handleBeforeEnter(element){
    element.style.color="red"
},
handleEnter(element,done){
    const animateTimer = setInterval(()=>{
        if(element.style.color){
            console.log(element.style.color);
            if(element.style.color=="red") element.style.color="green"
            else{
                element.style.color="red"
            }       
        }
    },500)
    setTimeout(()=>{
        clearInterval(animateTimer)
        done()
    },3000)
},
handleAfterEnter(ele){
    ele.style.fontSize="30px"
}
  

```
  - 出场动画钩子函数
    * before-leave 离场动画执行之前
    * leave 开始执行离场动画
    * after-leave 离场动画执行结束
- 双dom元素或组件的切换动画效果显示
  - 通过`v-if、v-else`控制
  - 通过`:is="componentname"`控制

`<transition>`标签上加入mode属性,`mode="out-in"`先显示离场动画，在显示入场动画。
`appear`属性：初次对某一个元素进行默认显示的时候也进行动画显示。
```javascript
    <transition mode="out-in" appear>
        <component :is="component" />
    </transition>
```