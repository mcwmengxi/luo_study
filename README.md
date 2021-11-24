<<<<<<< HEAD
# luo_study
=======
## Project setup
```
# 安装 vuepress
yarn install -D vuepress

# 安装依赖
yarn init

# 开始写作
yarn docs:dev

# 构建生成静态文件
yarn docs:build

# 发布更新到Gitee
./deploy.sh
```

## 目录结构
```
├─docs/                     // vuepress根目录
│  ├─.vuepress/             // vuepress应用相关
│  │   ├─dist/              // 编译之后的静态文件
│  │   ├─theme/             // 自定义主题
│  │   ├─config.js          // 配置
│  │   ├─enhanceApp.js      // 应用级别的配置
│  ├─basic/                 // 基础类文档
│  ├─vue/                   // Vue类文档
│  ├─README.md              // 首页文档和配置
│
├─deploy.sh                 // 部署到Gitee脚本
├─package.json              // 项目配置
├─README.md                 // 项目说明
```
>>>>>>> abcf1e1 (initial)
