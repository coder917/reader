var fs = require('fs');
exports.get_index_data = function() {
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
}

exports.get_book_data = function(id) {
	if (!id) {
		id = "18218";
	}
	var content = fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	return content;
}

exports.get_rank_data = function(channelId) {
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
}

exports.get_category_data = function(channelId) {
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
}

exports.get_channel_data = function(channelId) {
	var content = fs.readFileSync('./mock/channel/' + channelId + '.json', 'utf-8');
	return content;
}

//阅读器改造代码
exports.get_reader_content_data = function(chapterId) {
	var content = fs.readFileSync('./mock/reader/data' + chapterId + '.json', 'utf-8');
	return content;
}

exports.get_reader_chapter_data = function() {
	var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
	return content;
}

exports.get_search_data = function(start, end, keyword) {
	return function(cb) {
		var http = require('http');
		var qs = require('querystring');
		var data = {
			s: keyword,
			start: start,
			end: end
		}
		var content = qs.stringify(data);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content,
			method: 'GET'
		};

		req_obj = http.request(http_request, function(_res) {
			var callback_content = '';
			var _this = this;
			var content='';
			_res.setEncoding('utf8');

			_res.on('data', function(chunk) {
				content += chunk;
			});

			_res.on('end', function(e) {
				cb(null,content);
			});

		});

		req_obj.on('error', function(e) {

		});

		req_obj.end();
	}
}