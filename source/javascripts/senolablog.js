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
    window.location.href="http://www.baidu.com/s?wd=" + keywords;
}
function setvalues() {
    var domainroot="senola.github.io"//个人站点域名，替换成你的网站的网址即可 
    var keywords="site:"+domainroot+" "+$("#input_keywords_senola").val(); 
    $("#searchkeys_senola").val(keywords);
}
setTimeout(function(){
  $("#input_keywords_senola").bind('keyup', function(event) {
      setvalues();
  });
},5000);
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

(function() {
  var url = getBackgroundUrl();
  $("html").css({
    'background': 'url(' + url + ')',
    'background-repeat': 'repeat, no-repeat',
    'background-attachment': 'fixed',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover', //若图片偏小 则让图片自动铺满整个屏幕
  });
  senola_background_change();
})();

function senola_background_change() {
    var bg_url = getBackgroundUrl();
    var img = new Image();
    img.src = bg_url;
    img.onload = function () {
        $("html").css({
          'background': 'url(' + bg_url + ')',
          'background-repeat': 'repeat, no-repeat',
          'background-attachment': 'fixed',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover', //若图片偏小 则让图片自动铺满整个屏幕
          '-webkit-transition': 'all 5s ease-out',
          'transition': 'all 5s ease-out',
      });
      console.log(bg_url);
      setTimeout(senola_background_change, 20000);
    }
};

function getBackgroundUrl() {
  var num = getRandomNum(1,38);
  var bg_url = '//7xi3m0.com1.z0.glb.clouddn.com/images/blog/background/background' + num + '.jpg'
  return bg_url;
}