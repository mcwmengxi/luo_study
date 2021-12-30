# 表单验证VeeValidate的使用


## 一、简介

VeeValidate 是专用于 Vue.js 的验证库.

    特点： 
    基于模板的验证;
    提供了许多开箱即用的验证规则;
    一流的本地化支持;
    可以验证 HTML5 input 输入框和自定义 Vue 组件;
    自定义规则和错误消息.

## 二、安装

```js
//Vue3中使用
yarn add vee-validate@next
```

## 三、使用示例

注册From，Filed组件,定义校验规则提供给vee-validate组件使用

```javascript
import {Form,Field} from 'vee-validate'
export default {
   components:{
     Form,
     Field
   },
    methods: {
    // Validator function
    isRequired(value) {
      return value ? true : 'This field is required';
    },
  },
}
```
使用 Form,Field组件，使用 vee-validate-schema 校验规则验证表单
```html
<Form v-slot="{ errors }">
  <Field name="field" :rules="isRequired" />
  <span>{{ errors.field }}</span>
</Form>
```
表单使用Form组件，把input改成 Field 组件，默认解析成input
Field 添加name属性，作用是指定使用schema中哪个校验规则
Form 添加 v-slot="{errors}" 使用作用域插槽暴露 errors 错误对象
通过 errors['校验规则名称'] 取出错误信息，有则显示，无即隐藏

**校验自定义组件my-checkbox**
Field 的 as 属性可以指定为其他标签，也可指定为组件。
但是组件需要支持 v-model 否则校验不会触发。
```html
<Form class="form" :validation-schema="schema" v-slot="{errors}" 
  <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
  <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
  <Field as="my-checkbox" name="isAgree" v-model:modelValue="formInfo.isAgree" />
</Form>
```
如何在切换登录时候**清空表单和校验结果**
通过ref获取到Form
首先需要自己手动清除数据，然后使用`Form` 组件提供 resetForm 方法对表单进行清除校验结果
**如何整体表单校验**
`Form` 组件提供 validate 方法对表单进行整体校验