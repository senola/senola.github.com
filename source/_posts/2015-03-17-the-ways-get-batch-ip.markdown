---
layout: post
title: "使用shell脚本批量获取ip地址归属地"
tags: [shell,ip，批量，ip归属地]
date: 2015-03-17 20:43:21
comments: true
categories: 
---

最近比较伤脑，一大波新东西需要学习！目送着一批批脑细胞离我而去，心理不是个滋味。没办法，少壮不努力，老大徒伤悲吶！！！

朱老湿这个几天给了个任务，其中之一是要获取一份excel表格中ip属于某个省份的数据。我一看，得了，近30W的数据。好庞大的数据，这是大数据吧，亲！对我来说，超过500行的数据就是很多的了，好吧！难得有这个机会，尝尝大数据的味道（/(ㄒoㄒ)/~~）

<!--more-->

既然要获取省份那么就必须获取IP对应的省份，30w的数据，╮(╯▽╰)╭。 首先想到的是批处理，然后百度一下`批量获取IP地址归属地`，然后，然后就是一大波广告(～ o ～)~zZ！ 得出以下几点信息：

```
	1. 批量IP在线解析。 如搜收录网http://ip.soshoulu.com/    
	2. 下载批量解析软件，如“冉月IP地址查询软件"     
	3. 下载IP库，如纯真IP库    
```
但是以上都不是很理想。相比于IP库，在线解析可以精确到区、市，但是有查询限制。一次性只能查询200个IP，这对于30个IP地址来说就是杯水车薪~╥﹏╥...；批量解析软件未激活一次性也只能查询200个IP，更多需求票子！我是个从尚`free`、`open`和`share`的人，是不屑于去用它的。

还有一个更迫切的要求就是能读取文件和生成文件。你想啊30W个IP地址，不能手动COPY吧O(∩_∩)O~ 于是，又是一个漫长的摸索过程：

1. java---pass,过于笨重
2. pyhon --- pass 不会，成本太高
3. 花钱购买服务 ---- pass, no moeny at home 而且 对自己没有提高

最终，目标锁定在迷人的`shell`脚本上。感谢那些热于分享的大牛们，是你们让这个世界充满阳光，充满希望！！

以下是一段来自网络的shelL脚本，经过一小点的修改，终称为最适合自己的工具：

```
	#!/bin/bash
	ipp (){
		exec < $1
		while read a
		do
		sring=`curl -s "http://ip138.com/ips138.asp?ip=${a}&action=2"| iconv -f gb2312 -t utf-8|grep '<ul class="ul1"><li>' | awk -F '[<> ]+' '{print substr($7,7)}'`
		echo "$a  $sring "| tee -a ip-result.txt
		done
	}
	case $1 in
	-f)
	shift
	ipp $1
	;;
	-i)
	shift
	sring=`curl -s "http://ip138.com/ips138.asp?ip=${1}&action=2"| iconv -f gb2312 -t utf-8 |grep '<ul class="ul1"><li>' | awk -F '[<> ]+' '{print substr($7,7)}'`
	echo "$a  $sring " | tee -a ip-result.txt
	;;
	*)
	echo "[Help]
	$0 need -f or -i
	-f ------- argument is a file
	-i ------- argument is a IP
	[For example]:
	$0 -f ip.txt
	$0 -i 116.9.27.238
	"
	;;
	esac
```
使用很简单，直接将以上代码保存为`.sh`结尾文件，如`ip.sh`。在同级目录下新建一个文件并命名为`ip.txt`用来存放你需要批量查询的ip地址。 当运行无措后会将结果展示在shell控制台，并写入`ip-result.txt`文件。

![bloggetIPs-struts.png](http://7xi3m0.com1.z0.glb.clouddn.com/images/blog/getIPs-struts.png)

看起来似乎就该结尾了，非也！！！ 因为这代码是在`linux`下跑的，在`window`下不执行！那就以为这要在`linux`下跑程序了？ 习惯开着`window`的叉子是不是要安装个`VM`或者` virtualbox`，然后在虚拟机里边安装`linux`呢？？？？ 太麻烦了了，有没有好点的招？ 

再一次感谢，那帮为码农界无私奉献过的人！是你们让这个世界变得有希望。 没错,在`window`下照样能运行`linux`下的脚本。只要你安装了她-- <a href="http://msysgit.github.io/" target="msygit" style="font-weight:bold;color:green;font-size:18px;">msygit</a>，一切都不是事儿，不仅能运行脚本，还用`vi`等`linux`命令。我是git的热粉，所以早早就装好了O(∩_∩)O~~ 试试吧！

启动`git bash`

![git-bash](http://7xi3m0.com1.z0.glb.clouddn.com/images/blog/git-bash.png)

run code：

![bloggetIPs-struts.png](http://7xi3m0.com1.z0.glb.clouddn.com/images/blog/get-ip-batch.png)        

ip-result:

![ip-result](http://7xi3m0.com1.z0.glb.clouddn.com/images/blog/ip-result.png)

这段代码也存在一些不足，很受网速影响。当然像我那破电脑，开几个shell一起跑，机子立马发出呜呜的鬼哭狼嚎之声，`CPU`徘徊在`99%`。机不给力呀~

最后还是用公司电脑加同事电脑加一台服务器跑了一整天才把数据抓下来！（/(ㄒoㄒ)/~~）

数据无价，此言得之！