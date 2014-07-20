/**
 * describe: the js file was made of senola for his site : senola.github.io
 * date: 2014-3-8 10:13:49
 * 
 */
//谷歌站内搜索
function searchkeys(){
	var domainroot="senola.github.io"//个人站点域名，替换成你的网站的网址即可 
    var keywords="site:"+domainroot+" "+$("#input_keywords_senola").val(); 
    $("#searchkeys_senola").val(keywords);
    $("#googlesearch").submit();
}
// 随机数
function getRandomNum(under, over){
	switch ( arguments.length ){
		case 1: 
		    return parseInt(Math.random()*under+1);
		case 2: 
		    return parseInt(Math.random()*(over-under+1) + under);
		default: return 1;
	}
}
var num = getRandomNum(1,30);
var bg_url = 'https://raw.githubusercontent.com/senola/pictures/master/background/background' + num + '.jpg'
$("html").css({
  'background': 'url(' + bg_url + ')',
  'background-repeat': 'repeat, no-repeat',
  'background-attachment': 'fixed',
  '-webkit-background-size': 'cover',
  '-moz-background-size': 'cover',
  '-o-background-size': 'cover',
  'background-size': 'cover' //若图片偏小 则让图片自动铺满整个屏幕
});