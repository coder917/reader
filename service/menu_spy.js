var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

var http = require("http");
var https = require("https");
var cheerio = require("cheerio");
const schedule = require('node-schedule');
var html = "";
var id = 11518;
// var url = 'http://dushu.xiaomi.com/hs/v0/android/fiction/book/'+id;
// var url='http://dushu.xiaomi.com/store/v0/fiction/category/'+id+'000000?start=0&count=10&click=1';
// var url='http://dushu.xiaomi.com/store/v0/fiction/rank?start=0&count=10&r='+id;
// var url='http://dushu.xiaomi.com/store/v0/fiction/list/'+id+'?start=0&count=10';
// var url='http://dushu.xiaomi.com/store/v0/ad/persistent?start=0&count=10&type=4';

function fetchMenu() {
    var url = 'https://m.qidian.com/book/1001510652/catalog';

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
            var toc = [];
            $("ol li.jsChapter").each(function (i, item) {
                var item = {
                    title: $(this).children('a').children('span').text(),
                    id: $(this).children('a').attr('href').split('/')[3],
                    href: $(this).children('a').attr('href')
                }
                toc.push(item)
            })
            var item = {
                chapter_count: $('.chapter-sub-title output').text(),
                toc: toc
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
}


let rule     = new schedule.RecurrenceRule();
rule.hour  = 10;
rule.minute = 0;
schedule.scheduleJob(rule, function(){
    fetchIndex();
});

