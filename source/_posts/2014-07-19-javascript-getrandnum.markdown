---
layout: post
title: "javascript获取随机数方法"
date: 2014-07-19 10:47:19 +0800
articleid: 20140719104719
tags: [javascript,随机数，random,Random]
keywords: javascript，随机数，Random
comments: true
categories: javascript
---

研究了一下`javascript`关于随机数的生成，整理如下。

要输出随机数则须用到`javascript`的一个方法--`random()`，`random()`方法属于`Math`对象。在`javascript`中，`Math`对象用于执行数学任务，如：


```
  var pi_value = Math.PI; //圆周率     
  var sqrt_value = Math.sqrt(5);// 返回5的平方根
```

可以看出`Math`对象在数学计算上是不可缺少的工具。与`Date`，`String`不同，她不是对象的类，因此没有构造函数`Math()`。像`Math.sin()`这样的函数只是函数，并不是某个对象的方法。你不需要创建它，通过把`Math`作为对象使用即可以条用她的所有属性及方法。     
<!--more-->
#### Math 的属性

```
	E:返回算术常量 e，即自然对数的底数（约等于2.718）
	LN2:返回 2 的自然对数（约等于0.693）
	LN10:返回 10 的自然对数（约等于2.302）
	LOG2E:返回以 2 为底的 e 的对数（约等于 1.414）
	LOG10E:返回以 10 为底的 e 的对数（约等于0.434）
	PI:返回圆周率（约等于3.14159）
	SQRT1_2:返回返回 2 的平方根的倒数（约等于 0.707）
	SQRT2:返回 2 的平方根（约等于 1.414）
```

#### Math 的方法

```
    abs(x):返回数的绝对值
	acos(x):返回数的反余弦值
	asin(x):返回数的反正弦值
	atan(x):以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值
	atan2(y,x):返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）
	ceil(x):对数进行上舍入
	cos(x):返回数的余弦
	exp(x):返回 e 的指数
	floor(x):对数进行下舍入
	log(x):返回数的自然对数（底为e）
	max(x,y):返回 x 和 y 中的最高值
	min(x,y):返回 x 和 y 中的最低值
	pow(x,y):返回 x 的 y 次幂
	random():返回 0 ~ 1 之间的随机数
	round(x):把数四舍五入为最接近的整数
	sin(x):返回数的正弦
	sqrt(x):返回数的平方根
	tan(x):返回角的正切
	toSource():返回该对象的源代码
	valueOf():返回 Math 对象的原始值
```

了解`Math`对象的相关属性及方法会有意想不到的好处。今天主要研究一下`random()`方法，在`chrome`控制台输入：

    Math.random(); //回车
    ---> 0.7504939001519233
    Math.random(); //回车
    ---> 0.7824516440741718
    typeof(Math.random()); //回车
    ---> "number" 

可以看出`random()`方法返回的是0 ~ 1之间的伪随机数。注意，可能为0，但总是小于1即生成数的范围是[0,1)。利用`javascript`取整方法`parseInt（）`即可获取[0,1)之间的整数，如：

    parseInt(Math.random() * 10); // 回车
    ---> 3
    parseInt(Math.random() * 10); // 回车
    ---> 4
    parseInt(Math.random() * 10); // 回车
    ---> 6
    Math.floor(Math.random()*10 + 1); //获取[1,10] 之间的随机数
    ---> 10

由此，并可以获得了[0,1)之间的随机整数值，那么如果想要获取多位随机数（如4444,321,4443）又该如何操作呢？这里可以先随机出n位数，在将这n位数用连接符`+`连接起来即可，如下： 
   
    function RndNum(n) {
		var rnd = "";
		for(var i = 0; i < n; i++) {
           rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	}
	console.log("四位随机数： " + RndNum(4));　　//输出4位数的随机数的随机整数
    console.log("八位随机数： " + RndNum(8));　　//输出8位数的随机数的随机整数

根据以上信息，我们要指定某个范围（如（2,3）内）的随机数就可以利用公式：`(Math.random()*(n-m)+m)`既可以返回m-n之间的随机数了，通用代码如下：

    <!-- 获取随机正整数，对应的复数只需要加"-"号即可。0, 1 暂未判断 -->
    function getRandomNum( down, up) {
       switch (arguments.length) { //传入的参数个数
          case 1: 
              return parseInt(Math.random() * down + 1); // 获取[0,down)间的随机数
          case 2:
              return parseInt(Math.random() * (up - down + 1) + down); //获取[down,up] 之间的随机数
          default: 
              return 0; 
       }
    }
    // 测试代码
    console.log("[0,1]间的随机整数：" + getRandomNum(100));
    console.log("[2,5]间的随机整数：" + getRandomNum(2,5));
    console.log("[1,10]间的随机整数：" + getRandomNum(1,10));
		
以上便是使用`random()`方法创建正整数随机数的方法。当然我们还可以基于时间来创建， 如：

    var now_time = new Date();
    var second_num = now_time.getSeconds(); //产生一个基于目前时间的0到59的整数
    var timestamp_num = now_time.getTime(); //产生一个基于目前时间等我时间戳
    console.log("秒随机数：" + num);
    console.log("时间戳随机数：" + timestamp_num);

#### 总结

随机数的使用场景随处可见，如可以利用她创建随机的文本、表单、标题广告、背景图片。背景音乐及背景颜色等等。。。掌握了原理，如何运用也就是一码事儿！