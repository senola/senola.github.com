---
layout: post
title: "元素居中的那些事儿"
date: 2015-3-10 14:12:02
tags: [css,居中，center]
comments: true
categories: css

---

关于元素居中的问题一直都是css中抱怨的典范。小伙伴们常常抱怨为什么居个中这么难~ 为了能居中，拼了！！！！！

为了更更好的居中，特地总结了一下居中的方法，方便以后使用。 

不要左，不要右，我就要居中！！

<!--more-->
### 一、水平居中（horizontally）

#### （1）inline、inline-*元素（如文本，超链接等）的水平居中

我们知道，行内元素所占的空间是与元素本身大小相关的。 若要水平居中一个行内元素，只需要用一个块级元素包含它即可：

```
  .center-child {
    text-align: center;
  }
```
demo:
<p data-height="295" data-theme-id="12976" data-slug-hash="pvOVyq" data-default-tab="result" data-user="senola" class='codepen'>See the Pen <a href='http://codepen.io/senola/pen/pvOVyq/'>行内元素居中</a> by senola (<a href='http://codepen.io/senola'>@senola</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

次方法适用于`inline`、`inline-block`、`inline-table`、`inline-fex`等行内元素

#### （2）块级元素水平的居中

众所周知，块级元素霸道，它会独占一行。所有我们可以使用`margin-left`和`margin-right`的值为`auto`来居中块级元素（注意，需要给块级元素一个宽度，因为如果不给块级元素一个宽度那么该元素将充满整个屏幕，就不需要居中了）。

```
 .block-center {
   margin:0 auto;
 }
```
demo：
<p data-height="268" data-theme-id="12976" data-slug-hash="vEzjxZ" data-default-tab="result" data-user="senola" class='codepen'>See the Pen <a href='http://codepen.io/senola/pen/vEzjxZ/'>块级元素居中</a> by senola (<a href='http://codepen.io/senola'>@senola</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

此方法适用于任何宽度的块级元素。不要太爽！

#### （3）多个块级元素水平居中

假如需要使一个以上的块级元素水平居中，有两种方法：

方法一： 使用`inline-block`。方法二： 使用`flex-box`。 如下：

<p data-height="424" data-theme-id="12976" data-slug-hash="RNYyLL" data-default-tab="result" data-user="senola" class='codepen'>See the Pen <a href='http://codepen.io/senola/pen/RNYyLL/'>RNYyLL</a> by senola (<a href='http://codepen.io/senola'>@senola</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

其实，水平居中很简单。留意一下行内元素和块级元素的不同就行~ 接下来整整垂直居中！

### 二、垂直居中（Vertical）

垂直居中需要一些css技巧。

#### （1）inline、inline-*元素（如文本，超链接等）的垂直居中

##### 1. 单行垂直居中

有时候`inline`或`text`元素会默认垂直居中，这是因为元素的`padding-top`和`padding-bottom`值相等。

```
	.link {
		padding-top: 20px;
		padding-bottom: 20px;
    }
```
如果再一些情况下，padding不方便使用，那么可以设置`text`的`line-height`值为`text`的高度。

```
	.center-text-trick {
	  height: 100px;
	  line-height: 100px;
	  white-space: nowrap;
	}
```
<p data-height="400" data-theme-id="12976" data-slug-hash="xbaMQj" data-default-tab="result" data-user="senola" class='codepen'>See the Pen <a href='http://codepen.io/senola/pen/xbaMQj/'>行内元素单行垂直居中</a> by senola (<a href='http://codepen.io/senola'>@senola</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

##### 2. 多行行垂直居中

设置元素的`padding-top`与`padding-bottom`相等也可以是多行文本垂直居中。但这不是通用的方法，也许文本元素是在表格的单元格中,又或者是用了css让其行为类似表格。这时候可以使用`vertical-align`就可以帮助设置元素垂直居中。

下面介绍一种很有意思的方法,该方法被称为`ghost element`技术，顾名思义，`ghost`诡异的。该技术中采用了伪元素，来看看吧~ 保证不打死你！！！

```
	.ghost-center {
	  position: relative;
	}
	.ghost-center::before {
	  content: " ";
	  display: inline-block;
	  height: 100%;
	  width: 1%;
	  vertical-align: middle;
	}
	.ghost-center p {
	  display: inline-block;
	  vertical-align: middle;
	}
```

<p data-height="400" data-theme-id="12976" data-slug-hash="ogPVXV" data-default-tab="result" data-user="senola" class='codepen'>See the Pen <a href='http://codepen.io/senola/pen/ogPVXV/'>ghost element technique</a> by senola (<a href='http://codepen.io/senola'>@senola</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

#### （2）会计元素的垂直居中

##### 1. 知道元素的高度

如果知道块级元素的高度，你可以这样做： 

```
	.parent {
	  position: relative;
	}
	.child {
	  position: absolute;
	  top: 50%;
	  height: 100px;
	  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
	}
```

##### 2. 不知道元素的高度

如果不知道元素的高度，那么可以采用transform变换。

```
	.parent {
	  position: relative;
	}
	.child {
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	}
```
##### 3. 采用flexbox

```
	.parent {
	  display: flex;
	  display: -webkit-flex;
	  flex-direction: column;
	  justify-content: center;
	}
```
### 三、水平和垂直居中

当然你可以结合以上方法来使元素垂直水平居中。对于水平、垂直同时居中的话我们可以分三种情况：

##### 1. 元素有固定的狂高度

可以采用元素的宽高值得一半并取负值作为`margin`的值，同时采用绝对定位。这种方法各浏览器都有良好的支持。

```
    .parent {
	  position: relative;
	}
	
	.child {
	  width: 300px;
	  height: 100px;
	  padding: 20px;
	
	  position: absolute;
	  top: 50%;
	  left: 50%;
	
	  margin: -70px 0 0 -170px;
	}

```

##### 2. 元素没有固定的狂高度

如果元素没有固定的宽度和高度，那么我们可以采用`transform`和`绝对定位`实现。

```
	.parent {
	  position: relative;
	}
	.child {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
```

也可以设置`left`、`right`、`top`、`bottom`值为0,再设置`margin`为 `auto`

```
	.parent {
	  position: relative;
	}
	.child {
	  position: absolute;
	  top: 0;
	  left: 0;
	  top: 0;
      bottom: 0;
	  margin: auto;
	}
```

##### 3. 使用flexbox

```
	.parent {
	  display: flex;
	  display: -webkit-flex;
	  justify-content: center;
	  align-items: center;
	}
```

### 四、总结

通过以上方法，你可以居中任何元素。妈妈再也不用担心我不会居中喽 O(∩_∩)O~