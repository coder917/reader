var koa = require('koa');
var koa_static = require('koa-static-server');
var app = koa();
var cookieParser=require('cookie-parser');
var reload = require('auto-reload');
var controller = require('koa-route');
var cors = require('koa-cors');
var service = require('./service/webAppService.js')
var views = require('co-views')
// var synthesis=require('./service/AiSpeechSynthesis.js');
var express = require('express');
// app.use('/static',express.static('static'));//将文件设置成静态



var render = views('./view', {
  map: { html: 'ejs' }
})



app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));

app.use(koa_static({
	rootDir: './data/',
	rootPath: '/data/',
	maxage: 0
}));


//app.use(function *(){
  //this.body = 'Hello 1World';
//});

app.use(controller.get('/route_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = 'Hello World';
}));

app.use(controller.get('/ejs_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test',{title:'title_test'});
}));


app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index');
}));

app.use(controller.get('/backet', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('backet');
}));
 var querystring = require('querystring')
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	console.log(params);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));

app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search');
}));


app.use(controller.get('/channel', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	console.log(params);
	var channel = params.id;
	var title;
	if(channel==='male')title=='男生频道';
	else{title=='女生频道'}
	this.body = yield render('channel',{nav:'频道'});
}));

app.use(controller.get('/catelist', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('catelist',{nav:'分类'});
}));

app.use(controller.get('/rankitem', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rankitem',{nav:'排行'});
}));

app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/topiclist', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('topiclist',{nav:'活动书单'});
}));

app.use(controller.get('/topic', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('topic',{nav:'主题'});
}));

app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category',{nav:'分类'});
}));

app.use(controller.get('/user-center', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('user-center',{nav:'用户中心'});
}));

app.use(controller.get('/login', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('login',{nav:'登录'});
}));

app.use(controller.get('/registe', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('registe',{nav:'注册'});
}));

app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));

app.use(controller.get('/menu', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('menu',{nav:'目录'});
}));

//阅读器改造代码
app.use(controller.get('/ajax/reader/content', function*(){
	this.set('Cache-Control', 'no-cache');
	this.cookies.set({
		app_id:'mi_wap',
		build:'8888',
		device_id:'D950ENZ47FLFAJAI',
		user_type:'2',
		device_hash:'91d945a0b3445b5f9bc05dcdd8cfacd7',
		uLocale:'zh_CN',
		Hm_lvt_a1d10542fc664b658c3ce982b1cf4937:'1587027644297|1555469721,1555490682,1555491535,1555491644'
	});
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	console.log(params);
	var bookid = params.bookid;	
	var chapterId = params.chapterid;
	this.body = yield service.get_reader_content_data(bookid,chapterId);
}));

app.use(controller.get('/ajax/menu', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_reader_chapter_data(id);
}));

app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/topiclist', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_topiclist_data();
}));

app.use(controller.get('/ajax/topic', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_topic_data(id);
}));

app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/channel', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_channel_data(id);
}));

app.use(controller.get('/ajax/catelist', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_catelist_data(id);
}));

app.use(controller.get('/ajax/rankitem', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_rankitem_data(id);
}));

app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var url=this.url
	console.log(url)
	var s = params.s;
	var start = params.start;
	var count = params.count;
	var source = params.source;
	this.body = yield service.get_search_data(start,count,s,source);
}));

app.use(controller.get('/ajax/categoryclick', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_categoryclick_data(id);
}));

app.use(controller.get('/ajax/categorylatest', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_categorylatest_data(id);
}));

app.use(controller.get('/ajax/categoryfinish', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_categoryfinish_data(id);
}));

app.use(controller.get('/ajax/searchtag', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	this.body = yield service.get_search_tag();
}));

app.use(controller.get('/ajax/bookid', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_bookid_data(id);
}));

app.use(controller.get('/ajax/categorylist', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = yield service.get_categorylist_data(id);
}));


app.listen(3000);

