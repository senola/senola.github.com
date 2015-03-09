## 元素居中的那些事儿

关于元素居中的问题一直都是css中抱怨的典范。小伙伴们常常抱怨为什么居个中这么难~ 为了能居中，拼了！！！！！

为了更更好的居中，特地总结了一下居中的方法，方便以后使用。

不要左，不要右，我就要居中！

### 一、水平居中（horizontally）

#### （1）inline、inline-*元素（如文本，超链接等）的居中

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








