---
title:  居中和BFC
---
# 居中和BFC
## BFC
`block formatting context`，块格式化上下文,形成了BFC就代表形成了一个独立的区域，而且区域里面子元素不受外部元素影响。BFC中的元素布局是不受外界的影响（我们往往利用这个特性来清除浮动元素对其非浮动的兄弟元素和其子元素带来的影响），并且在一个BFC中，一块和一行中所有的内联元素所组成的都会垂直的沿着其父元素的边框排列。

触发BFC的方法：
- 浮动元素,增加了浮动特性
- 具有绝对定位的元素：`absolute`和`fixed`,脱离了标准文档流。
- 具有overflow并且值不是visible的块元素，隐藏超出内容。
- 给父级设置行级块元素 display:inline-block
- display为flow-root的值。（CSS3中新增加的。），只是单纯的触发BFC。
BFC的三个特性：
- 阻止外边距折叠
- 可以包含浮动的元素
- 可以阻止元素被浮动元素覆盖
BFC应用：
- 清除浮动
- 防止 margin 重叠
- 多栏布局的一种方式

**解决float高度塌陷问题。**
给父元素加float元素，但是无法解决浮动给后面的元素带来的影响
使用BFC,来清除浮动
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <style>
        #f {
            width: 200px;
            border: 5px solid green;
            /* float: left; */
            display: flow-root;
        }      
        #z {
            float: left;
            width: 100px;
            height: 100px;
            border: 1px solid blue;
        }     
        #next {
            width: 100px;
            height: 100px;
            border: 1px solid #eca;
        }
    </style>
</head>

<body>
    <div id="f">
        <div id="z"></div>
    </div>
    <div id="next">1</div>
</body>

</html>
```
**解决父子之间的margin合并问题。**
  - 给父级设置边框或内边距，不建议使用,会破坏布局
  - bfc
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <style>
        #f {
            width: 200px;
            margin: 10px;
            background: red;
            /* border: 1px solid green; */
            display: flow-root;
            /* overflow: hidden; */
        }
        
        #z {
            margin: 40px;
            width: 100px;
            height: 100px;
            background: gold;
            /* border: 1px solid blue; */
        }
    </style>
</head>

<body>
    <div id="f">
        <div id="z"></div>
    </div>
</body>

</html>
```
**兄弟元素之间上下边距折叠问题。**
给其中一个元素套上一个空标签div，给它设置display：flow-root，形成两个不同的BFC
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />

    <style>
        #z1,
        #z2 {
            margin: 20px;
            width: 100px;
            height: 100px;
            border: 1px solid green;
        }
        
        .item {
            display: flow-root;
        }
    </style>
</head>

<body>
    <div id="f">
        <div class="item">
            <div id="z1"></div>
        </div>
        <div id="z2"></div>
    </div>
</body>

</html>
```

**解决float时块元素重叠，行内元素不重叠。**
下面示例中我们让图片浮动，图片元素的块级兄弟元素，会与图片元素发生重叠，但块级元素中文字不会重叠，块级元素宽度不够时，块级元素被撑开，文字显示在图片下方；但是行内元素不会。
通过给块级元素加上display：flow-root，形成BFC，不会浮动元素重叠，使元素优先排列在图片右方
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <style>
        .z {
            /* width: 200px; */
            width: 110px;
            border: 1px solid green;
            display: flow-root;
        }
        
        img {
            width: 100px;
            height: 100px;
            float: left;
        }
    </style>
</head>

<body>
    <div id="f">
        <img src="https://cdn2.jianshu.io/assets/default_avatar/15-a7ac401939dd4df837e3bbf82abaa2a8.jpg" alt="">
        <span>123456</span>
        <div class="z">12345</div>
        <div class="z">12345</div>
        <span>123456</span>
        <div class="z">12345</div>
        <div class="z">12345</div>
        <div class="z">12345</div>
        <div class="z">12345</div>
        <div class="z">12345</div>
        <div class="z">12345</div>
    </div>
</body>

</html>
```

## 清除浮动方法
- 使用BFC
- 浮动元素后面加空元素，空元素设置clear：both
- 父元素后加伪类::after
```css
  &::after{
      content:"";
      display:bolck;
      clear:both
  }

```

## 水平、垂直居中
**内联元素水平居中**
`text-algin:center`只对inline和inline-block有效。对block无效。
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />

    <style>
        #f {
            text-align: center;
        }  
        img {
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div id="f">
        <img src="https://cdn2.jianshu.io/assets/default_avatar/15-a7ac401939dd4df837e3bbf82abaa2a8.jpg" alt="">
        <span>华华的baba</span>
        <div style="width:100px;height:100px;border:1px solid green;">hehe</div>
    </div>
</body>
</html>
```
**块级元素水平居中**
有宽度时，设置margin：0 auto，水平居中
块级元素不设置宽度时，它会继承宽度，给它加上text-align：center，使它的内联元素在这个块级元素里面居中
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />

    <style>  
        #f>div {
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div id="f">
        <div style="width:100px;height:100px;border:1px solid green;">hehe</div>
    </div>
</body>

</html>
```

**flex方式实现水平、垂直居中**
块状元素、行内元素、行内块状元素都可以。`display:flex;justify-content: center;`

**单行内联元素垂直居中**
设置内联元素的高度和行高相等。

**多行内联元素垂直居中**
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />

    <style>
        #f {
            border: 1px solid red;
            width: 400px;
            height: 500px;
            font-size: 0;
            line-height: 500px;
        }
        
        span {
            display: inline-block;
            font-size: 16px;
            line-height: normal;
            /* 设置基线 */
            vertical-align: middle;
            border: 1px solid green;
        }
    </style>
</head>

<body>
    <div id="f">
        <span>沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）</span>
    </div>
</body>

</html>
```

**`display:table-cell`**

table-cell将元素设置为单元格，在table-cell中使用middle时，单元格中的内容的中线与行的中线对齐。
给父元素加上vertical-align: middle;让内联元素居中显示
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <style>
        #f {
            border: 1px solid red;
            width: 400px;
            height: 500px;
            display: table-cell;
            vertical-align: middle;
        }       
        span {
            border: 1px solid green;
        }
    </style>
</head>
<body>
    <div id="f">
        <span>沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）沛华真丑！（江鉴哲说的！）</span>
    </div>
</body>
</html>
```

**定位实现水平、垂直居中**
- 使用margin-left和margin-top来实现(知道子元素宽高)。
- 使用`transform:translate(-50%,-50%);|| transform:translate3d(-50%,-50%,0);`来实现(不知道子元素宽高)。
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <style>
        #f{
            border:1px solid red;
            width:400px;
            height:500px;
            position:relative;
        }
        #z{
            position:absolute;
            top:50%;
            left:50%;
            /* margin-top:-50px; */
            /* margin-left:-50px; */
            transform:translate(-50%,-50%);
            width:100px;
            height:100px;
            border:1px solid green;
        }
    </style>
</head>
<body>
    <div id="f">
        <div id="z"></div>
    </div>
</body>
</html>
```

