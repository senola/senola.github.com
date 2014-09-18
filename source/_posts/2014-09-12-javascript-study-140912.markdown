---
layout: post
title: "浅谈javascript 中undefined、null 和 NaN，call()和apply()的区别"
date:  2014-09-12 18:34:12
articleid: 20140912183412
tags: [javascript,call,undefined,NaN]
keywords: javascript，call，apply
comments: true
categories: javascript
---

### 一、undefined、null 和 NaN

#### 1.类型区别
`javascript`中有5中简单的数据类型（也称为基本数据类型），分别是：`undefined`、`null`、`boolean`、`number`和`String`。另外还有一种复杂数据类型---`objecct`,`object`本质上是由一组无序的名值对组成。   
介于`javascript`是松散类型的，因此需要有一种手段来检测给定的数据类型--`typeof`。对于一个值使用`typeof`操作符后可能返回下列某个字符串：   

 - "undefined": 值未定义 
 - "boolean": 值为布尔值
 - "string": 值为字符串
 - "number": 值为数值
 - "object": 值为对象或者null
 - "function": 值为函数
 <!--more-->

 测试代码：

	   var s1;      
	   var s2 = true;   
	   var s3 = 1;  
       var s4 = "javascript";  
       var s5 = new Object();  
       var s6 = null;
       var s7 = NaN;  
       var s8 = undefined;  
       var s9 = function () {}; 
       
	   alert(typeof s1); //显示"undefined"  
	   alert(typeof s2); //显示"boolean"  
	   alert(typeof s3); //显示"number"   
	   alert(typeof s4); //显示"string"   
	   alert(typeof s5); //显示"object"   
	   alert(typeof s6); //显示"object"   
	   alert(typeof s7); //显示"number"   
	   alert(typeof s8); //显示"undefined"   
       alert(typeof s9);  //显示"function"     

从以上代码可以看出未定义的和定义未赋值的类型为`undefined`,`null`是一种特殊的`object`，`NaN`是代表非数字值得特殊值，说明某些算数运算（如求负数的平方根）的结果不是数字，如方法parseInt()和parseFloat()在不能解析制定的字符串时就返回这个值。  

#### 2.比较

    var s1; //s1 值为undefined
    var s2 = null;
    var s3 = NaN;
    
    alert(s1 == s2); // 显示"true"
    alert(s1 != s2); // 显示"false"
   
    alert(s1 == s3); // 显示"false"
    alert(s1 != s3); // 显示"true"
   
    alert(s2 == s3); // 显示"false"
    alert(s2 != s3); // 显示"true"

    alert(s3 == s3); // 显示"false"
    alert(s3 != s3); // 显示"true"  

根据以上代码可以得出：（1）`undefiend`与`null`是相等的；(2)`NaN`与任何值都不相等，与自己也不相等。

#### 3. isNaN()函数
`isNaN()`函数用于检查其参数是否是非数字值，通常用于检测`pareFloat()`和`parseInt()`的结果，以判断它们表示的是否和合法的数字，当然也可以用`isNaN()`函数来检测算数错误，比如用0做出书情况：

	var day = new Date();
	alert(isNaN(3.1415926));        //false
	alert(isNaN(day));            //false
	alert(isNaN('BeginMan'));    //true
	alert(isNaN("2005/12/12"));    //true
    alert(isNaN(NaN));

#### 4. undefined 类型判断
    var test;
    if(test == undefined) {
        console.log("----------测试一------------");
    }
    //用typeof操作符返回的是字符串
    if(typeof(test) == "undefined") {
       console.log("----------测试二------------")
    } 

### 二、 call()和apply()

一直搞不明白这两个玩意儿的联系和区别，网上查了点资料，整理如下。

#### 1.联系
`apply()`和`call()`都能劫持另外一个对象的方法，集成另外一个对象的属性：

    function1.apply(obj,args)；

**obj**:这个对象将代替`function1`类中的`this`对象，即`function1`函数里的`this`不再指向`function1`自身，而是指向`obj`对象。   
**args**:数组类型的参数，作为参数传给`function`。

`call()`和`apply()`类似，只是参数类表不一样，如下：

    function2.call(obj,[param1[,param2[...[,paramN]]]]);

**obj**:该对象将代替`function2`类中的`this`对象，与`apply()`类似。    
**params**:参数列表（用逗号二凯的0个或者多个参数），注意，这不是数组。

<span style="color:red;font-weight: bold;">调用了这两个方法的结果</span>：依然执行了`function`函数的功能，只是该`function`以另一个目标对象和一个参数列表。

#### 2. 区别

用法不相同，主要是参数不完全相同。 

测试代码：

	    function Person(name,age) {    
			this.name=name;    
			this.age=age;    
			this.money = 500;  
		}   
		  
		function myFun() {       
		    alert(this.money);  
		}  
		  
		var money = 100;  
		myFun(money);   
		//return 100;  
        //window.myFun(money); 
		//这个时候this指向的是window对象，其实myFun函数和定义的var money = 100;都作为window对象子对象（即全局对象）  
		  
		myFun.apply(window,[]);  //save to window.myFun.apply(window,[]);    
		//return 100;  //同上  
		  
		myFun.apply(new Person('zhangsan',23),[]);    
		//return 500, 空数组作为参数，仅符合语法要求  
		//这个时候myFun方法里面的this指向的是new Person('zhangsan',23)对象，二不是myFun类(函数)，故弹出500  
		  
		myFun.call(new Person('zhangsan',23),money,300,'mycardId');    
		//return 500, 后面money,300和mycardId是参数列表作为参数，一一列出  
		//这个时候myFun方法里面的this指向的是new Person('zhangsan',23)对象，二不是myFun类(函数)，故弹出500  