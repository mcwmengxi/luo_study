---
title: Vue项目学习
---

## 不同路由使用同一组件
创建和编辑的页面使用的是同一个component
```js
{ path: 'add/0', name: 'ServiceEdit', component: () => import('@/views/service/ServiceEdit.vue') },
{ path: 'update/:id', name: 'ServiceUpdate', component: () => import('@/views/service/ServiceEdit.vue') }
```
默认情况下当这两个页面切换时并不会触发vue的created或者mounted钩子.
官方推荐通过watch $route的变化来做处理
其实可以简单的在router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了。
```js
<router-view :key="key"></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
```
