

var urlloc = window.location.href;
let urlarr = urlloc.split('?id=');
var id = urlarr[1];
console.log(id);

var fs = require('fs'); //文件模块
var xmlDoc, dirurl = "../data/book/" + id + ".json";

function isExistFile(dirurl) {
  var xmlHttp;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  console.log(dirurl)  
  xmlHttp.open("post", dirurl, false);
  xmlHttp.send();
  // console.log(xmlHttp.readyStatus)
  console.log(xmlHttp.status)

  if (xmlHttp.status == 200) return true; //url存在
  else if (xmlHttp.status == 404) return false; //url不存在
  else return false; //其他状态

  // return false;  

};
$(function () {
  console.log(id + isExistFile(dirurl));
  if (isExistFile(dirurl) == false) {
    var http = require("http");
    var html = "";
    var url = 'http://dushu.xiaomi.com/hs/v0/android/fiction/book/' + id;
    
    http.createServer(function (req, res) {
    　　     // 添加响应头
            res.setHeader("Access-Control-Allow-Origin", "*"); 

    });
    http.get(url, (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      var header = res.headers;
      res.setEncoding('utf8');
      res.on("data", function (data) {
        html += data;
      })
      res.on("end", () => {


        const $ = cheerio.load(html);
        console.log(html)
        // var str = JSON.stringify(html);
        // console.log(str);
        var file = path.join(__dirname, '../data/book/' + id + '.json')
        fs.writeFile(file, html, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log('文件创建成功，地址：' + file);
        });
      })
    })
  }else{
    $.get('/ajax/book?id=' + id, function (d) {
      new Vue({
        el: '#app',
        data: d,
        mounted(){
          this.setBook();
        },
        methods: {
          readBook: function () {
            location.href = "/reader?id=" + id;
          },
          setBook:function(){
          loaclStorage.setItem("ficiton_reader_"+id,d.item);
            console.log(d.item)
          }
        }
      });
    }, 'json');
  }
})