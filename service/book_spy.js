var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
var html = "";
var id = 11518;
// var url = 'http://dushu.xiaomi.com/hs/v0/android/fiction/book/'+id;
// var url='http://dushu.xiaomi.com/store/v0/fiction/category/'+id+'000000?start=0&count=10&click=1';
// var url='http://dushu.xiaomi.com/store/v0/fiction/rank?start=0&count=10&r='+id;
// var url='http://dushu.xiaomi.com/store/v0/fiction/list/'+id+'?start=0&count=10';
// var url='http://dushu.xiaomi.com/store/v0/ad/persistent?start=0&count=10&type=4';
var url = 'https://m.qidian.com/book/1010701347';

var http_request = {
  hostname: 'dushu.xiaomi.com',
  port: 80,
  path: '/hs/v0/android/fiction/book/306643',
  method: 'GET'
};

https.get(url, (res) => {
  var header = res.headers;
  res.setEncoding('utf8');
  res.on("data", function (data) {
    html += data;
  })
  res.on("end", () => {


    const $ = cheerio.load(html);
    var book_score=$('.book-score .gray').text();
    book_score=book_score.split('/');
    var score=book_score[0];
    if(score=='暂无评分')score=0;
    var score_count=book_score[1].replace(/[^0-9]/ig, "");
    var update_status=$('.book-meta-r .gray').text();
    var latest=update_status.split('·');
    var id=url.split('/')[4];
    var item = {
      title: $('.book-title').text(),
      id:id,
      author: $('.book-rand-a span').text().split('：')[1],
      cover:$('.book-cover').attr('src'),
      score: score,
      score_count:score_count,
      word_count: $('.book-cell .book-meta').last().text().split('字')[0],
      latest: latest[1].split('至')[1],
      updated:latest[0]
    }
    console.log(item)
    // var str = JSON.stringify(html);
    // console.log(str);
    // var file = path.join(__dirname, '../data/rankitem/'+'15010'+'.json')
    // var file = path.join(__dirname, '../data/topic/'+id+'.json')
    var file = path.join(__dirname, '../data/book/'+id+'.json')
    fs.writeFile(file, JSON.stringify(item,null,2), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('文件创建成功，地址：' + file);
    });
  })
})

