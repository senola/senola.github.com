---
layout: post
title: "用javascript判断各浏览器类型及版本"
date: 2014-07-17 12:40:16 +0800
comments: true
articleid: 20140717124016
tags: [javascript,浏览器]
keywords: javascript，浏览器,用javascript判断各浏览器类型及版本
categories: javascript
---


今天要在`IE`下测试大文件上传插件，发现项目组"前辈"们写的判断`IE`浏览器的的代码不管用了。

    navigator.userAgent.toLowerCase().indexOf("msie") != -1；

调试代码才发现原来`IE11`下`userAgent`值的格式与`IE10`不一样。打印出ie9,ie10,ie11三个版本的浏览器userAgent值，如下所示：
   
    IE9：userAgent:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)    
    IE10:userAgent:Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)  
    IE11:userAgent:Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko;

<!--more-->
可以看出，前两者（IE9,IE10）都含有`MIIE`这样一个值而后面紧接着的是`IE`浏览器的版本号。而奇葩的`IE11`的`userAgent`又重新做了调整，不再用`MIIE`来标识浏览器版本号，而是用的 `rv`。神奇吧，让我们再一次向这个让无数码农挥洒汗水的浏览器致敬！！╮(╯▽╰)╭  

所以单纯的判断浏览器类型是否是`IE`的话，就要多增加一个`IE11`的判断了。（`IE12`貌似出来了，没测试过。。）但是如果`IE13`问世了，那么这个`userAgent`的值是不是又会改变呢？到时候是不是又得回来多添加一行专门为`IE13`而处理的语句？？如果是单纯的判断是否是`IE`浏览器的话，可以考虑不用`userAgent`,我们知道只有`IE`浏览器支持创建`ActiveX`控件，因此她有一个其他浏览器没有的东西--ActiveXObject函数，所以只需要判断`window`对象中是否存在`ActiveObject`函数就可以很明确的判断出当前的浏览器是否是神器`IE`： 

    function isIE () { //判断是否是IE（ie11下也适合）  
	    if( window.ActiveXObject || "ActiveXObject" in window) {
			console.log("I am IE");
		} else {
		    console.log("I not IE");
	    }
	}

看到上边代码就能发现为什么多了一个`"ActiveXObject" in window`判断？没错那个还是因为`IE11`。查了点资料貌似是因为`IE11`中`window.ActiveObject`属性在`DOM`中是隐藏的，也就是说你不能在`IE11`中用`window.ActiveObject`来判断。有兴趣可以去参考下 <a href="http://msdn.microsoft.com/en-us/library/ie/dn423948%28v=vs.85%29.aspx" target="_blank">Cross-browser plugin detection</a>,反正我没啥兴趣，吼吼~

地球是一个很神奇的世界，你知道这个世界上有多少种浏览器吗？除了我们熟知的IE, Firefox, Opera, Safari四大浏览器之外，世界上还有近百种浏览器~ 当然我们还是只关心这些主流的浏览器，其他的也没精力，没时间去折腾！


浏览器的世界太奇妙，我们不懂！

额，既然`IE`都说了，其他的也学习下吧~~IE就不提了。


###  Firefox 

`firefox`中的`DOM`元素都有一个`getBoxObjectFor`函数，用来获取该`DOM`元素的位置和大小（IE对应的是getBoundingClientRect）。这是`firefox`独有。`firefox`下的`userAgent`大致如下：

     Mozilla/5.0 (Windows; U; Windows NT 5.2) Gecko/2008070208 Firefox/3.0.1
     Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070309 Firefox/2.0.0.3
     Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070803 Firefox/1.5.0.12

可根据`Firefox`后面的数字来获取版本号。


### Opera ###

 `Opera`提供了专门的浏览器标志是`window.opera`属性。Opera浏览器的userAgent如下：   

    Opera/9.27 (Windows NT 5.2; U; zh-cn)
    Opera/8.0 (Macintosh; PPC Mac OS X; U; en)
    Mozilla/5.0 (Macintosh; PPC Mac OS X; U; en) Opera 8.0 

获取靠近`Opera`的数字即为浏览器版本号。


### Safari ###

`Safari`浏览器中有一个其他浏览器没有的`openDatabase`函数，可做为判断Safari的标志。Safari典型的userAgent如下：

    Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13
    Mozilla/5.0 (iPhone; U; CPU like Mac OS X) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/4A93 Safari/419.3 

获取`version`之后的数字，即是获取浏览器版本号。


### Chrome ###

本人最热衷的浏览器！！ `Chrome`有一个`MessageEvent`函数，但Firefox也有。不过，好在`Chrome`并没有`Firefox`的`getBoxObjectFor`函数，根据这个条件还是可以准确判断出`Chrome`浏览器的。目前，`Chrome`的`userAgent`是： 

    Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13

可以看到，`chrome`的`userAgent`中还包含了`safar`的特征，这或许就是为什么`Chrome`可以运行所有`Apple`浏览器应用的基础吧。

so,根据以上特性可以经浏览器的版本判断整合在一起，如下：

    <script type="text/javascript">
	    function  browserCheck () { // 各个浏览器判断
	        var Sys = {};
	        var ua = navigator.userAgent.toLowerCase(); //获取 userAgent 值
	        var s;
	        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : //IE 11
	        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	        
	        if (Sys.ie) console.log('IE: ' + Sys.ie);
	        if (Sys.firefox) console.log('Firefox: ' + Sys.firefox);
	        if (Sys.chrome) console.log('Chrome: ' + Sys.chrome);
	        if (Sys.opera) console.log('Opera: ' + Sys.opera);
	        if (Sys.safari) console.log('Safari: ' + Sys.safari);
	    };
    </script>

往这儿瞧瞧-->: <a href="/collections/javascript/getBrowserType/getBrowserType.html" target="_blank" style="color:green;font-weight:bold;">测试地址</a>


### 总结：
   
    1. 浏览器种类繁多，各浏览器有很多不同之处，有必要熟悉。
    2. IE浏览器使用人居多，有必要知晓其相关特别之处。