# flex布局

### 1.flex布局(弹性布局,flexible布局)

- flex布局，移动端最常见，在pc端也被越来越多的人使用，除了ie的不兼容性
- 开启flex布局的容器加flex-container
- flex-container里面的直接子元素加flex-items
- 给元素设置display属性为flex或inline-flex使它成为flex-container，但flex是以块级元素形式存在，而inline-flex是以行内元素形式存在
- 设置Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

### 2.布局模型

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目(flex-items)默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

![flex](https://i.loli.net/2021/11/02/NyA5uepYg6qXfPT.png)

### 3.布局属性

#### 3.1应用在flex-container上的css属性

- **flex-direction**

  - flex-items默认都是沿着主轴方向从main-start到main-end方向排布

  - flex-direction可以设置主轴main-axis具体的方向，`row(默认值)| row-reverse | column |column-reverse`

    ![flex-direction](https://i.loli.net/2021/11/02/RlnyiVMuHJXaItz.jpg)

- **justify-content**

  - justify-content决定了flex-items在主轴方向上的对齐方式
  - flex-start(默认值) 与main-start对齐
  - flex-end 与main-end对齐
  - center 居中对齐
  - space-between 两端对齐，中间等分(flex-items之间距离相等，felx-items与main-start、main-end距离为0)
  - space-evenly 等分  (flex-items之间距离相等，felx-items与main-start、main-end距离为flex-items之间距离)
  - space-around 等分，但两端只取中间距离的一半(flex-items之间距离相等，felx-items与main-start、main-end距离为flex-items之间距离的一半)
  
- **align-items**

  - align-items决定了flex-items在交叉轴cross-axis上的对齐方式
  - normal(默认)，在弹性布局中效果和stretch保持一致
  
  - stretch 如果flex-items在交叉轴方向的size为auto时，会自动拉伸填充flex-container
  - flex-start 与cross-start对齐
  
  - flex-end与cross-end对齐
  - center 居中对齐
  
  - baseline 与基线对齐，如果flex-items中有多行文本，以首行文本的基线为基准线
  - z注意：如果弹性元素有外边距那么，弹性元素的外边距也会影响弹性元素在交叉轴上的分布
  
- **flex-wrap**

  - no-warp(默认)，单行，如果flex-itemssize较大，会被压缩，直到能单行放入
  - wrap，多行显示
  - wrap-reverse 在wrap基础上，将cross-start 和cross-end方向调转
  
- **flex-flow**

  flex-direction 和flex-wrap的简写形式。顺序随意 `flex-flow:row wrap`

- **align-content**

  -  决定了多行flex-item是在交叉轴cross-axis上的对齐方式如果是单行该属性不起作用
  - stretch(默认值) 和align-items类似
  - flex-start 与cross-start对齐
  - flex-end 与cross-end对齐
  - center 居中对齐
  - space-between 两端对齐，中间等分(flex-items之间距离相等，felx-items与cross-start、cross-end距离为0)
  - space-evenly 等分  (flex-items之间距离相等，felx-items与cross-start、cross-end距离为flex-items之间距离)
  - space-around 等分，但两端只取中间距离的一半(flex-items之间距离相等，felx-items与cross-start、cross-end距离为flex-items之间距离的一半)

#### 3.2 应用在flex-items上的css属性

- **order**

  根据设置的值大小决定项目(flex-items)排列方向，值越小，越靠前，默认为0 `order:<integer>`

- **flex-self**

  单独设置某个项目的在交叉轴上的对齐方式，覆盖align-items属性，值和align-item的选项一样，默认值为auto，即继承align-items的属性，如果没有父元素，则为stretch。

  ```css
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
  ```

- **flex-grow**

  - flex-grow决定了项目(flex-items)的放大比列,默认值是0，即有剩余空间，也不放大，值可以是任意非负数。
  - flex-grow属性只有当flex-container在主轴方向上还有剩余size时才会有效
  - 所有项目(flex-items)的flex-grow总和**sum超过1**时，单个项目(flex-item)扩展的size为size*flex-grow/sum
  - 所有项目(flex-items)的flex-grow总和**sum没有超过1**时，单个项目(flex-item)扩展的size为size*flex-grow
  - flex-items扩展后的最终size不能超过max-width/max-height

- **flex-shrink**

  - flex-grow决定了项目(flex-items)的缩小比列,默认值是1，即自动缩小，值可以是任意非负数。

  - flex-grow属性只有当flex-items在主轴方向上超过main-size时才会有效

  - (自定义)收缩比列=单个项目base-size\*自身flex-shrink/所有项目(单个项目base-size\*自身flex-shrink)的和

  - 所有项目(flex-items)的**flex-shrink总和sum超过1**时，单个项目(flex-item)收缩的size为**超过flex-container**的size*收缩比列.

  - 所有项目(flex-items)的**flex-shink总和sum**没有超过1时，单个项目(flex-item)收缩的size为超过flex-container的size\***flex-shink总和sum**\*收缩比列

    ```
            超出部分250*flex-shrink总和0.5=125
            item1收缩比列 600*0.2=120
            item2收缩比列 100*0.2=20
            item3收缩比列 100*0.1=10
            收缩比列和 150
            item1收缩size= 125*120/收缩比列和150
            item2收缩size= 125*20/收缩比列和150
            item3收缩size= 125*10/收缩比列和150
    ```

  - flex-items扩展后的最终size不能超过max-width/max-height

- **flex-basis**

  默认值为`auto`，即项目的本来大小。

  决定flex-items的最终base-size的因素：优先级从高到低

  - max-width|max-height|min-width|min-height
  - flex-basis
  - width|height
  - 内容本身的size

  ```css
  flex-basis: <length> | auto; /* default auto */
  ```

- **flex**

  - flex为 `flex-grow|| flex-shrink ||flex-basis` 的简写,
  - `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，**默认值**为`0 1 auto`。后两个属性可选，可以指定1个，2个或3个值。
  - 该属性有两个**快捷值**：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。
  - 单值时
    - 无单位会被当作flex-grow的值，为有效的width值时会被当作flex-basis的值
    - 关键字none，auto，initial
  - 双值时
    - 第一个值认作flex-grow的值
    - 后面一个根据单值的规则来确定是flex-shrink还是flex-basis
  - 三值时

```css
// 按照顺序指定
flex:  <'flex-grow'> <'flex-shrink'> <'flex-basis'> 
```