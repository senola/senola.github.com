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