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
var url = 'https://m.qidian.com/book/1001510652/303286020';

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
        var p = [];
        $(".read-section p").each(function (i, item) { 
            var text=$(this).text().replace(/\ +/g,"");
            text=text.replace(/[\r\n\t]/g,"");
            text=text.replace(/　/g,"");
            p.push(text)
        })
        var item = {
            title: $('h3').text(),
            p: p
        }
        console.log(item)
        // var str = JSON.stringify(html);
        // console.log(str);
        // var file = path.join(__dirname, '../data/rankitem/'+'15010'+'.json')
        // var file = path.join(__dirname, '../data/topic/'+id+'.json')

        // fs.writeFile(file, html, function (err) {
        //   if (err) {
        //     // return console.log(err);
        //   }
        //   console.log('文件创建成功，地址：' + file);
        // });
    })
})

