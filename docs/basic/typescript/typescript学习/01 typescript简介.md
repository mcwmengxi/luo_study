---
title : 01 typescript简介
---

# typescript简介
## typescript特点
TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

## typescript开发环境
- 在有node的环境下全局安装/更新typescript

```bash
yarn global add typescript
yarn global upgrade typescript
```

- 编译ts文件

```bash
//编译ts文件
tsc type.ts
//运行
node test.js
```

- 编译ts文件,使用ts-node插件
  
```bash
yarn global add ts-node

//编译ts文件
ts-node type.ts
```



