https.get(url, (res) => {
    res.setEncoding('utf8');
    res.on("data", function (data) {
        html += data;
    })
    res.on("end", () => {
    })
})



var http = require('http');
var cookies = fs.readFileSync('./data/cookie.txt', 'utf-8')
var http_request = {
    hostname: 'dushu.xiaomi.com',
    port: 80,
    path: '/hs/v0/android/fiction/book/' + id,
    method: 'GET',
    headers: {
        "Cookie": cookies
    }
};

