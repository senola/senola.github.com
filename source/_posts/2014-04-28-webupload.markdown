---
layout: post
title: "上传插件之----Web Uploader"
date: 2014-04-28 23:22:45 +0800
comments: true
articleid: 20140428232245
tags: [上传插件,学习，Web Uploader]
keywords: Web Uploader,开源,插件
categories: 插件 开源 
---

最近云盘要大改版，前端采用了谷歌的`AngularJS`框架。大改嘛，之前云盘用插件要换的也都要换。飞哥说插件可以用但是却不能乱用，尤其是将其用于商业领域的，必须慎重加慎重，首先选选择的插件得符合相关的开原协议（如上篇），因滥用别的插件而上法庭的例子举不胜数。作为小菜的我一直都以够用，管用，好用的心态去用这些插件的，什么开原协议啊，什么版权啊之类的，不懂~大神告诉我，这个很重要，因为一旦被查出，后果很严重。。。飞哥推荐使用以`MIT`开源协议发布的`Web Uploader`作为上传插件。研究了它几天，苦恼，痛苦，桑心...
<!-- more -->
<a href="http://gmuteam.github.io/----------er" target="_blank">**Web Uploader**</a> 是由`Baidu WebFE(FEX)`团队开发的一个简单的以`HTML5`为主，`FLASH`为辅的现代文件上传组件。在现代的浏览器里面能充分发挥`HTML5`的优势，同时又不摒弃主流IE浏览器，沿用原来的`FLASH`运行时，兼容IE6+。两套运行时，同样的调用方式，可供用户任意选用。采用大文件分片并发上传，极大的提高了文件上传效率。特点如下：
```
分片、并发  
预览、压缩  
多途径添加文件   
HTML5 & FLASH  
MD5秒传   
易扩展，可拆分     
```
看着介绍貌似很吊，于是demo走起....   
官网的第一个`demo`就把我给吓尿了，这文档也太简单了吧！！！据飞哥说他们团队游50多人，我只想说你们把文档写这么简单你家人知道吗？？？照着做本地硬是跑不通！无奈只能在它官网`F12`~~~~(>_<)~~~~  
  
一、引入JS、css。`webuploader.js`可以在官网在下载，`cloudupload.js`是上传前各参数的初始化及上传结果处理,`bootstrap.min.css`是`bootstrap`框架的核心文件，可以在官网下载:
```	
    <link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css"/>
	<script type="text/javascript" src="libs/webupload/webuploader.js"></script>
	<script type="text/javascript" src="libs/webupload/cloudupload.js"></script>
```
二、html模块，包含存放文件信息的容器、选择按钮和上传按钮三个部分。
```
<div id="uploader" class="wu-example">
    <!--用来存放文件信息-->
    <div id="thelist" class="uploader-list"></div>
    <div class="btns">
        <div id="picker">选择文件</div>
        <button id="ctlBtn" class="btn btn-default">开始上传</button>
    </div>
</div>
```
三、初始化上传参数（webuploader.js）
```
var $ = jQuery,
$list = $('#thelist'),
$btn = $('#ctlBtn'),
state = 'pending'; //上传状态
window.fileList = []; //获取要上传的文件列表数组
var uploader = WebUploader.create({
    // swf文件路径
    swf: '/web2/libs/webupload/Uploader.swf',
    // 文件接收服务端。
    server: 'http://webuploader.duapp.com/server/fileupload.php',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: id,

    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false
});

//当有文件被添加进队列的时候
uploader.on( 'fileQueued', function( file ) {
	//发送ajax请求道后台 返回从后台拼装的SAL上传url
	$.ajax({
		type : 'POST',
		url : '/cloud-web/upload/getUploadUrl.htm',
		data: {
			"fileName": file.name,
			"folderId": window.currentFolderId,
			"size": file.size
		},
		dataType: 'json',
		success: function(data){
			file.server = data.uploadUrl;
			console.log("sal url------->" + data.uploadUrl);
		},
		error : function(data){
			//错误提示
			console.log("获取上传地址错误...");
		}
	  });
	fileList.push(file); //将要上传的文件加入fileList数组
	$list.append( '<div id="' + file.id + '" class="item">' +
        '<h4 class="info">' + file.name + '</h4>' +
        '<p class="state">等待上传...</p>' +
    '</div>' );
});

//文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
        $percent = $li.find('.progress .progress-bar');
    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class="progress progress-striped active">' +
          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
          '</div>' +
        '</div>').appendTo( $li ).find('.progress-bar');
    }
    $li.find('p.state').text('上传中');
    $percent.css( 'width', percentage * 100 + '%' );
    $percent.attr( 'uploadProgress', percentage);
});

//文件上传完成
uploader.on( 'uploadComplete', function( file ) {
	//上传完成隐藏进度条
	$( '#'+file.id ).find('.progress').fadeOut();
});
//文件上传成功
uploader.on( 'uploadSuccess', function( file ) {
	$( '#'+file.id ).find('p.state').text('已上传');
});
//文件上传失败
uploader.on( 'uploadError', function( file ) {
	$( '#'+file.id ).find('p.state').text('上传出错');
});
//文件上传各个部分监听
uploader.on( 'all', function( type ) {
    if ( type === 'startUpload' ) {
        state = 'uploading';
    } else if ( type === 'stopUpload' ) {
        state = 'paused';
    } else if ( type === 'uploadFinished' ) {
        state = 'done';
    }
});
//按钮添加监听事件
$btn.on( 'click', function() {
    if ( state === 'uploading' ) {
        uploader.stop();
    } else {
        uploader.upload();
    }
});
```
蛋疼的紧，官网demo代码少的可怜~  效果见官网。 

紧接着遇到第二个难题，云盘现在文件上传采用的是`SAL`（存储访问层）模式，即每一个文件都要从服务端获取一个上传点，然后上传插件在向上传点进行上传操作。这里就存在一个问题，从上面我们发现要进行上传操作我们需要创建`Web Uploader`实例:WebUploader.create{...},我们发现在创建实例的时候需要传入一个文件接收服务端`server`,这就遇到了难题，我们上传模式是一个文件对应一个上传`URL`，而次插件又没有提供类似的方法可以动态修改每个`server`对应的值。经过不懈的努力外加看源码再加各种测试，终于搞定了~··   

首先，定义一个全局数组`window.fileList = [];`用于获取要上传的文件列表数组，然后在文件加入队列的时候对数组进行push操作：  
```
//当有文件被添加进队列的时候
uploader.on( 'fileQueued', function( file ) {
	//发送ajax请求道后台 返回从后台拼装的SAL上传url
	$.ajax({
		type : 'POST',
		url : '/cloud-web/upload/getUploadUrl.htm',
		data: {
			"fileName": file.name,
			"folderId": window.currentFolderId,
			"size": file.size
		},
		dataType: 'json',
		success: function(data){
			file.server = data.uploadUrl;
			console.log("sal url------->" + data.uploadUrl);
		},
		error : function(data){
			//错误提示
			console.log("获取上传地址错误...");
		}
	  });
	fileList.push(file); //将要上传的文件加入fileList数组
	$list.append( '<div id="' + file.id + '" class="item">' +
        '<h4 class="info">' + file.name + '</h4>' +
        '<p class="state">等待上传...</p>' +
    '</div>' );
});
```
file.server = data.uploadUrl;给每一个file对象增加一个该filefile对象对应的上传URL，fileList.push(file);将所有要上传的文件放入数组。接下来就是修改`webUpload.js`源码。定位`webUpload.js`第3876行，修改如下：  
```
send: function() {
    var owner = this.owner,
        opts = this.options,
        xhr = this._initAjax(),
        blob = owner._blob,
        formData, binary;
    
    //将上传队列中的第一个文件的数组的上传地址放入server
    //window.fileList.length 变量在cloudupload中定义
    var server;
	for(var i = 0 ;i < window.fileList.length; i++){
		if(window.fileList[i].id == opts.formData.id){
			server = window.fileList[i].server;
		}
	}
    ....
    ....
```
此处遍历了`window.fileList`，根据每一个`file`对象的`id`进行匹配对应的上传`URL`。

到这里就基本OK了，看起来简单，可当初找起来真费事儿，头疼~~~，之后文件上传还遇到跨域问题，因为文件上传的服务器与服务端不是同一域名下，所以会出现跨域问题。经`ngnix`修改相关配置后将问题解觉...
