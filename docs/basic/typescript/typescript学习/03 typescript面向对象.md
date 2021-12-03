---
title: typescript面向对象
---

# typescript面向对象

## interface接口

- TypeScript中的接口，就是用来规范类型的，也能解决类型注解重复(代码复用)的问题。
- 接口与类型别名有区别，类型别名可以是单个类型，而接口必须是对象。
- 接口也有可选值`name?:String`
- 接口可以添加一些任意值,`[propname: string]: any;`
- 类可以实现接口，接口也可以用于继承一个接口

```javascript
interface User {
    name:string,
    age:number,
    skill?:string,// 可选值
    [propName:string]:any,// 任意值
    play(): string | undefined;
}
const user1:User = {
    name:"nangong",
    age:25,
    skill:"dance",
    sex:"女",
    play(){
        console.log(this.skill);
        return this.skill
    }
}
console.log(user1);

// 类可以实现接口
class UserLevelTwo implements User{
    name = "kyo";
    age = 26;
    skill = "singer";
    sex = "女";
    play(){
        console.log(this.skill);
        return this.skill
    }
}
console.log("-----------接口实现-------");
let levelTwo = new UserLevelTwo()
console.log(levelTwo.skill);
levelTwo.play()

// 接口也可以用于继承一个接口
interface levelTop extends User{
    showPermissions(): string;
}

class UserLevelTop implements levelTop{
    name = "kyo";
    age = 26;
    skill = "singer";
    sex = "女";
    play(){
        console.log(this.skill);
        return this.skill
    }
    showPermissions(){
        return "顶级权限"
    }
}

console.log("-----------接口继承-------");

let levelTop = new UserLevelTop()
levelTwo.play()
console.log(levelTop.showPermissions());
```


## 类