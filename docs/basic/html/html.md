---
title: html
---
## URL地址的组成部分及作用
http://www.ceshi.com:80/test/test.html?par1=val1&par2=val2#p

http:// 告诉服务器用什么约定和客户端进行通信
www.ceshi.com 域名，浏览器会自动解析服务器地址，要请求哪个服务器。
:80 端口号
/test/test.html 路径,服务器上的路径定位指定的资源，可选的，可以有多层文件路径。
?par1=val1&par2=val2 查询字符串 ,用于给服务器端脚本语言传递参数，比如以后会将这些值传递给后端语言，查询字符串放在?以后，以 键=值 的方式来表示，多个查询字符串使用&来分隔，可选的。
#p 表示要获取/test/test.html这个资源中的子资源
## 绝对路径和相对路径
- 绝对路径：从头开始计算文件出现的路径
- 相对路径: 以当前路径为参照，建立的目录路径

## 行内元素有哪些？块级元素有哪些
- 行内元素：span a img i 表单标签input button
- 块级元素：div p h ul(ol) li section article

## HTML5新增了哪些元素
- 语义和结构化元素: header nav section aside article footer canvas
- 媒体元素 audio video
- 新的表单元素，表单类型以及表单新属性

## 对HTML语义化的理解
HTML语义化:用合适的标签存放合适的内容
作用：
- 语义化标签具有可读性，便于团队开发和维护
- 无css,网页也能呈现出很好的内容和代码结构
- SEO，有助于搜索引擎理解页面，更准确更快速的搜索消息