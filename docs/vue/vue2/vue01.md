# Vue类文档分类1第一篇

### 数据代理

​	

```js
    // 通过操作obj2代理改变obj1中的值
    const obj1 = {
      x:1
    }

    const obj2 = {
      y:2
    }

    Object.defineProperty(obj2,'x',{
      get(){
        return obj1.x
      },
      set(x){
        obj1.x = x
      }
    })

    console.log(obj2.x);
    obj2.x = 2;
    console.log(obj2.x);
```

