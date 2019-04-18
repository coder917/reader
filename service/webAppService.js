var fs = require('fs');
exports.get_index_data = function () {
	var content = fs.readFileSync('./data/test2.json', 'utf-8');
	return content;
}

exports.get_book_data = function (id) {
	// if (!id) {
	// 	id = "352876";
	// }
	var content = fs.readFileSync('./data/book/' + id + '.json', 'utf-8');
	return content;
}

exports.get_rank_data = function (channelId) {
	var content = fs.readFileSync('./data/rank.json', 'utf-8');
	return content;
}

exports.get_category_data = function (channelId) {
	var content = fs.readFileSync('./data/category.json', 'utf-8');
	return content;
}

exports.get_channel_data = function (channelId) {
	var content = fs.readFileSync('./data/channel/' + channelId + '.json', 'utf-8');
	return content;
}

//阅读器改造代码
// exports.get_reader_content_data = function(chapterId) {
// 	var content = fs.readFileSync('./data/reader/data' + chapterId + '.json', 'utf-8');
// 	return content;
// }

exports.get_reader_chapter_data = function (id) {
	return function (cb) {
		var http = require('http');

		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/fiction/detail/'+id+'?chapter_id=0',
			method: 'GET'
		};

		req_obj = http.request(http_request, function (_res) {
			var callback_content = '';
			var _this = this;
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data', function (chunk) {
				content += chunk;
			});
			_res.on('end', function (e) {
				cb(null, content);
			});
		});
		req_obj.on('error', function (e) {

		});
		req_obj.end();
	}
}

exports.get_search_data = function (start, count, s) {
	return function (cb) {
		var http = require('http');
		var qs = require('querystring');
		var data = {
			s: s,
			start: start,
			count: count
		}
		var content = qs.stringify(data);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?start=0&count=10&s=' + s+'&source=2%2C5',
			method: 'GET'
		};

		req_obj = http.request(http_request, function (_res) {
			var callback_content = '';
			var _this = this;
			var content = '';
			_res.setEncoding('utf8');

			_res.on('data', function (chunk) {
				content += chunk;
			});

			_res.on('end', function (e) {
				cb(null, content);
			});

		});

		req_obj.on('error', function (e) {

		});

		req_obj.end();
	}
}

exports.get_bookid_data = function (id) {
	return function (cb) {
		var http = require('http');

		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/hs/v0/android/fiction/book/' + id,
			method: 'GET'
		};

		req_obj = http.request(http_request, function (_res) {
			var callback_content = '';
			var _this = this;
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data', function (chunk) {
				content += chunk;
			});
			_res.on('end', function (e) {
				cb(null, content);
			});
		});
		req_obj.on('error', function (e) {

		});
		req_obj.end();
	}
}

exports.get_reader_content_data = function (bookid, chapterId) {
	return function (cb) {
		var qs = require('querystring');
		var cookies = fs.readFileSync('./data/cookie.txt', 'utf-8')
		var data = {
			bookid: bookid,
			chapterId: chapterId
		}
		var content = qs.stringify(data);
		var http = require('http');
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/drm/v0/fiction/link?fiction_id='+bookid+'&chapter_id='+chapterId+'&format=jsonp',
			// path: '/drm/v0/fiction/link?fiction_id=352876&chapter_id=3&format=jsonp',
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
		};

		req_obj = http.request(http_request, function (_res) {
			// _res.cookie({
			// 	'app_id':'mi_wap',
			// 	'build':'8888',
			// 	'device_id':'D950ENZ47FLFAJAI',
			// 	'user_type':'2',
			// 	'device_hash':'91d945a0b3445b5f9bc05dcdd8cfacd7',
			// 	'uLocale':'zh_CN',
			// 	'Hm_lvt_a1d10542fc664b658c3ce982b1cf4937':'1587027644297|1555469721,1555490682,1555491535,1555491644',
			// });

			var callback_content = '';
			var _this = this;
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data', function (chunk) {
				content += chunk;
			});
			_res.on('end', function (e) {
				cb(null, content);
			});
		});
		req_obj.on('error', function (e) {

		});
		req_obj.end();
	}
}