var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

var http = require("http");
var cheerio = require("cheerio");
var html = "";
var url = 'http://dushu.xiaomi.com/hs/v0/android/fiction/book/352876';
http.get(url, (res) => {
var header=res.headers;
res.setEncoding('utf8');
  res.on("data", function (data) {
    html += data;
  })
  res.on("end", () => {


    const $ = cheerio.load(html);
    console.log(html)
    // var str = JSON.stringify(html);
    // console.log(str);
    var file = path.join(__dirname, 'test2.json')
    fs.writeFile(file, html, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('文件创建成功，地址：' + file);
    });
  })
})
