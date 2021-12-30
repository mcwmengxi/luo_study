---
title: 服务器上部署项目
---

## ssh连接主机
ssh root@101.132.70.183

## 安装node方式1
- 选一个下载目录，这个会和后面软连接有关
`cd /usr/local/src/`

- 下载压缩包：linux中使用wget下载工具下载压缩包，cd到想要存放压缩包的路径下，执行`wget https://npm.taobao.org/mirrors/node/v14.15.5/node-v14.15.5-linux-x64.tar.xz`

- 如果没有解压工具(一般有的),先安装解压文件插件，有则跳过
yum install -y tar

- 解压文件
tar -xvf node-v14.15.5-linux-x64.tar.xz
- 改名，建议改，原本的不好敲
mv node-v14.15.5-linux-x64 nodejs

- nodejs下bin目录会有node和npm文件，执行软连接

  1、软链接就是：ln –s 源文件 目标文件，
  --只会在选定的位置上生成一个文件的镜像，不会占用磁盘空间，类似与windows的快捷方式。
  2、硬链接ln源文件目标文件，没有参数-s，
  --会在选定的位置上生成一个和源文件大小相同的文件，无论是软链接还是硬链接，文件都保持同步变化。
- 第一个路径就是一开始说的下载路径，第二个就是镜像的路径
ln -s /usr/local/src/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/src/nodejs/bin/node /usr/local/bin/

- 验证nodejs是否安装好
node -v
## nvm安装node
- github上的两个命令安装，安装完reopen终端
```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh|bash
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh|bash
```
  但是我没有使用， 我的电脑 环境 两个没成功 ，原因没细察。
  直接 把源码 下载下来吧 ，然后 运行 install.sh，自动修改。

- operate
  nvm 对应的是 node 的版本
  nrm对应的 是 npm registry manager ，是管理npm registry的版本
  nvm ls 显示当前可行版本 
  nvm  install v12.18.0 安装某个版本

- 安装的过程中可能出现的问题 
  把 对应的版本 下载下来，下载下来的文件 是 tar.xz文件，解压`tar xvJf node-14.8.0-linux-x64.tar.xz`
  然后修改名称 为 v14.8.0 放入~/.nvm/versions/node中,`cd /root/.nvm/versions/node`查看所有安装的版本
  mv node-14.8.0-linux-x64 ~/.nvm/versions/node/v14.8.0
  nvm use xxx 使用当前这个版本


## 配置淘宝镜像（可选操作）
淘宝镜像就是可以让你下载包快一点

查看当前镜像：
npm config get registry

下载淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

切换镜像
npm config set registry https://registry.npm.taobao.org

回车直接设置成功，没反应的

再查看是否切换成功即可
npm config get registry
## 打包项目

1. 将vue项目打包build，得到一个dist文件夹
2. 用express启动一个服务器server.js，读取dist文件
3. 进行本地测试
## 部署项目

1. 将node_modules文件夹删除，通过xftp(xshell点击上方xftp图标新建文件传输)将代码发送给服务器
2. cd到package.json目录下，执行npm install,下载项目所需要的包
## 全局安装pm2
  是一个进程管理工具,可以用它来管理你的node进程,并查看node进程的状态,当然也支持性能监控,进程守护,负载均衡等功能
```
    npm install -g pm2
    pm2 start app.js        // 启动
    pm2 start app.js -i max //启动 使用所有CPU核心的集群
    pm2 stop app.js         // 停止
    pm2 stop all            // 停止所有
    pm2 restart app.js      // 重启
    pm2 restart all         // 重启所有
    pm2 delete  app.js      // 关闭
```
## 全局安装forever

forever是一个nodejs守护进程，完全由命令行操控。forever会监控nodejs服务，并在服务挂掉后进行重启。
1. 安装 forever

```js
npm install forever -g
```

2. 启动服务

```js
service forever start
```

3. 使用 forever 启动 js 文件

```js
forever start index.js
```

4. 停止 js 文件

```js
forever stop index.js
```

5. 启动js文件并输出日志文件

```js
forever start -l forever.log -o out.log -e err.log index.js
```

6. 重启js文件

```js
forever restart index.js
```

7. 查看正在运行的进程

```js
forever list
```
`/usr/local/src/node-v14.15.5/lib/node_modules/forever`
**设置软链接**
ln -s /root/.nvm/versions/node/v12.18.0/lib/node_modules/forever/bin/forever /usr/bin/forever