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

exports.get_rank_data = function () {
	var content = fs.readFileSync('./data/rank.json', 'utf-8');
	return content;
}

exports.get_topiclist_data = function () {
	var content = fs.readFileSync('./data/topiclist.json', 'utf-8');
	return content;
}


exports.get_topic_data = function (topicid) {
	var content = fs.readFileSync('./data/topic/'+topicid+'.json', 'utf-8');
	return content;
}

exports.get_category_data = function () {
	var content = fs.readFileSync('./data/category2.json', 'utf-8');
	return content;
}

exports.get_channel_data = function (channelId) {
	var content = fs.readFileSync('./data/channel/' + channelId + '.json', 'utf-8');
	return content;
}

exports.get_catelist_data = function (cateId) {
	var content = fs.readFileSync('./data/catelist/' + cateId + '.json', 'utf-8');
	return content;
}

exports.get_rankitem_data = function (rankId) {
	var content = fs.readFileSync('./data/rankitem/' + rankId + '.json', 'utf-8');
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

exports.get_search_data = function (start,count,s,source) {
	return function (cb) {
		var http = require('http');
		var cookies = fs.readFileSync('./data/cookie_search.txt', 'utf-8')		
		var qs = require('querystring');
		var data = {
			start: 0,
			s:s,
			source:'2,5',
			count: 10
		}
		var content = qs.stringify(data);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			// path: '/store/v0/lib/query/onebox?start='+start+'&count='+count+'&s=' + s+'&source='+source,
			path: '/store/v0/lib/query/onebox?' + content,
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
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

exports.get_search_tag = function () {
	return function (cb) {
		var http = require('http');
		var cookies = fs.readFileSync('./data/cookie.txt', 'utf-8')
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/ad?key=df_search_tags&a=1',
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
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

exports.get_categorylist_data = function (id) {
	return function (cb) {
		var http = require('http');

		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/hs/v0/android/fiction/category/'+id,
			method: 'GET'
		};
console.log(http_request)
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

exports.get_categoryclick_data = function (id) {
	return function (cb) {
		var http = require('http');
		var cookies = fs.readFileSync('./data/cookie_search.txt', 'utf-8')		
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			// path: '/store/v0/lib/query/onebox?start='+start+'&count='+count+'&s=' + s+'&source='+source,
			path: '/store/v0/fiction/category/'+id+'?start=0&count=10&click=1',
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
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

exports.get_categorylatest_data = function (id) {
	return function (cb) {
		var http = require('http');
		var cookies = fs.readFileSync('./data/cookie_search.txt', 'utf-8')		
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			// path: '/store/v0/lib/query/onebox?start='+start+'&count='+count+'&s=' + s+'&source='+source,
			path: '/store/v0/fiction/category/'+id+'?start=0&count=10&latest=1',
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
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

exports.get_categoryfinish_data = function (id) {
	return function (cb) {
		var http = require('http');
		var cookies = fs.readFileSync('./data/cookie_search.txt', 'utf-8')		
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			// path: '/store/v0/lib/query/onebox?start='+start+'&count='+count+'&s=' + s+'&source='+source,
			path: '/store/v0/fiction/category/'+id+'?start=0&count=10&finish=1',
			method: 'GET',
			headers: {
				"Cookie": cookies
			}
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