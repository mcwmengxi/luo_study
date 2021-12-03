---
title: typescript基础入门
---

## typescript基础类型

### typescript静态类型

变量一旦定义了静态类型,就无法改变,以后改变变量值也要符合静态类型,否则会报错
>如何定义静态类型

```ts
    let count:number = 1;
    // count = "nangong" //error
    console.log(count);
```

> 自定义静态类型

```ts
    interface User {
        name:String,
        age:Number
    }
    let person:User = {
        name:"nangong",
        age:25
    }
    console.log(person ,typeof person);//{ name: 'nangong', age: 25 }
```

### 基础静态类型和对象类型
**基础静态类型**
是对基础数据类型的定义, `null,undefinde,symbol,boolean，void`
**对象类型**
对象类型可以分为对象类型,数组类型,类类型,函数类型这几种形式。
```ts
const array :String[] = ['a','b','c']//字符串数组，子项必须为字符串

class Person{}
const factor:Person = {name:"factor1"}
const student:Person = new Person()
console.log(student);//Person {}

const fun:()=>string = ()=>{return "函数类型"}
console.log(fun());//函数类型

```

### 类型注解和类型推断
**类型注解**
告诉我们变量是什么类型的
```ts
    let count:number;
    count = 1;
```
**类型推断**
ts自动推断没有指明变量类型的变量的变量类型
```ts
//ts类型推断功能能够确定它是数据类型
let count = 1;
```
**使用规则**
对于ts能自动自动分析变量类型的,可以不做类型声明;否则采用类型注解
```ts
// 传入参数具有不确定性，需要进行类型注解ts才能推断出来要传参类型,而返回值ts能够直接推断出来，所以不需要
function getSum(a:number,b:number){
    return a+b
}
```

### 函数的参数类型定义和返回值的定义
**参数类型定义**
```ts
function getSum(a:number,b:number):number{
    return a+b
}
```

**参数为对象**
```ts
function getCount({a,b}:{a:number,b:number}):number{
    return a+b
}
//对象属性只有一个
function calcValue({value}:{value:number}):number{
    return value*2
}
console.log(getCount({a:1,b:2}));
console.log(calcValue({value:1}));
```

**函数无返回值的定义**
```ts
// 使用void类型注解
function sayHello(): void {
  console.log("hello world");
}
```
**never返回类型**
如果函数永远也执行不完，就可以定义一个never返回值
```ts
//死循环
function infiniteLoop():never{
    while(true){}
    console.log('after infiniteLoop'); 
}
//抛出错误
function throwError():never{
    throw new Error("error message");
    console.log("after throw error");
    
}
console.log(throwError());
```


### 数组类型定义
**子项为一般数据类型**
```ts
 // 数字数组
 const numberArr:number[] = [1,3,5]
 // 字符串数组
 const stringArr:string[] = ['a','b','c']
 // undefined
 const undefinedArr:undefined[] = [undefined,undefined]
 console.log(undefinedArr);//[ undefined, undefined ]
 // 混合数组
 const mixArr: (number | string | undefined | object)[] = [1,'a',undefined,{'a':"a"},[1,2,3]]
 console.log(mixArr);//[ 1, 'a', undefined, { a: 'a' }, [ 1, 2, 3 ] ]
```

**子项为对象数据类型**
```ts
// 数组里面是对象
const objectArr1: object[] = [{'a':"a"},[1,2,3]];
// 类型别名
type User = {name:string,age:number}
const objectArr2: User[] = [{name:"nangong",age:25},{name:"kyo",age:23}]
// 类
class Person{
    constructor(name:string,age:number){
    }

}
const objectArr3: Person[] = [{name:"nangong",age:25},{name:"kyo",age:23}];
console.log(objectArr1);
console.log(objectArr2);
console.log(objectArr3);
```

### 元组使用和类型约束
- 元组，对数组的一个加强，更好的规范里面的值，精准匹配，里面每个值有固定的类型，且顺序不能改变
- 数据源是CVS这种文件的时候，会使用元组
```ts
 const tuple:[string,string,number][] = [
     ["user1", "teacher", 28],
    ["user2", "teacher", 18],
     ["user3","teacher",25]
 ]
console.log(tuple);
```


