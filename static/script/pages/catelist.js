var url = window.location.href;
let urlarr = url.split('?id=');
console.log(urlarr);
var id = urlarr[1];
console.log(id)
var categorylist;
var items;
var id2 = id;
var status = 0;
// $.get('/ajax/categorylist?id=' + id,function(d){
// 	new Vue({
// 	  el: '#Tag__63',
// 		data: d.cate.children
// 	});
// },'json');
$.get('/ajax/categorylist?id=' + id, function (d) {
	categorylist = d;
	
}, 'json');
$.get('/ajax/catelist?id=' + id, function (d) {
	items = d.items;
}, 'json');
// $.get('/ajax/categorylist?id=' + id, function (categorylist) {
// 	$.get('/ajax/catelist?id=' + id, function (d) {
console.log(categorylist);

setTimeout(function () {
	var vm = new Vue({
		el: '#app',
		data() {
			return {
				items: items,
				id: id,
				categorylist: categorylist.cate.children,
				labels: [{
						index: 1000000,
						label: '玄幻'
					},
					{
						index: 2000000,
						label: '奇幻'
					},
					{
						index: 3000000,
						label: '武侠'
					},
					{
						index: 4000000,
						label: '仙侠'
					},
					{
						index: 5000000,
						label: '都市'
					},
					{
						index: 6000000,
						label: '历史'
					},
					{
						index: 7000000,
						label: '军事'
					},
					{
						index: 8000000,
						label: '灵异'
					},
					{
						index: 9000000,
						label: '科幻'
					},
					{
						index: 10000000,
						label: '游戏'
					},
					{
						index: 11000000,
						label: '竞技'
					},
					{
						index: 12000000,
						label: '竞同人'
					},
					{
						index: 13000000,
						label: '职场'
					},
					{
						index: 14000000,
						label: '短篇'
					},
					{
						index: 15000000,
						label: '玄幻言情'
					},
					{
						index: 16000000,
						label: '仙侠奇缘'
					},
					{
						index: 17000000,
						label: '古代言情'
					},
					{
						index: 18000000,
						label: '现代眼前'
					},
					{
						index: 19000000,
						label: '浪漫青春'
					},
					{
						index: 20000000,
						label: '悬疑灵异'
					},
					{
						index: 21000000,
						label: '科幻空间'
					},
					{
						index: 22000000,
						label: '游戏竞技'
					},
					{
						index: 23000000,
						label: '同人小说'
					},
					{
						index: 24000000,
						label: '耽美小说'
					},
				]
			}
		},
		created() {
			try {
				document.body.removeChild(document.getElementById('appLoading'))
				setTimeout(function () {
					document.getElementById('app').style.display = 'block';
				}, 500)
			} catch (e) {

			}
			console.log(this.items)
		},
		methods: {
			go: function (e, index) {
				id2 = e;
				if (status == 0) {
					$.get('/ajax/categoryclick?id=' + e, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						console.log(index)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(index).addClass('-crt')
					}, 'json')
				} else if (status == 1) {
					$.get('/ajax/categorylatest?id=' + id2, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(index).addClass('-crt')
					}, 'json')
				} else {
					$.get('/ajax/categoryfinish?id=' + id2, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(index).addClass('-crt')
					}, 'json')
				}
			},
			all: function (e) {
				id2 = id;
				if (status == 0) {
					$.get('/ajax/catelist?id=' + id2, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(0).addClass('-crt')
					}, 'json');
				}else if(status==1){
					$.get('/ajax/categorylatest?id=' + id2, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(0).addClass('-crt')
					}, 'json');
				}else{
					$.get('/ajax/categoryfinish?id=' + id2, function (data) {
						items.length = 0;
						for (let i = 0; i < 10; i++) items.push(data.items[i])
						console.log(items)
						$('#Tag__63 li').removeClass('-crt');
						$('#Tag__63 li').eq(0).addClass('-crt')
					}, 'json');
				}
			},
			click:function(){
				$.get('/ajax/categoryclick?id=' + id2, function (data) {
					status = 0;
					items.length = 0;
					for (let i = 0; i < 10; i++) items.push(data.items[i])
					console.log(items)
					$('#Tag__64 li').removeClass('-crt');
					$('#Tag__64 li').eq(0).addClass('-crt')
				}, 'json')
			},
			latest: function () {
				$.get('/ajax/categorylatest?id=' + id2, function (data) {
					status = 1;
					items.length = 0;
					for (let i = 0; i < 10; i++) items.push(data.items[i])
					console.log(items)
					$('#Tag__64 li').removeClass('-crt');
					$('#Tag__64 li').eq(1).addClass('-crt')
				}, 'json')
			},
			finish:function(){
				$.get('/ajax/categoryfinish?id=' + id2, function (data) {
					status = 2;
					items.length = 0;
					for (let i = 0; i < 10; i++) items.push(data.items[i])
					console.log(items)
					$('#Tag__64 li').removeClass('-crt');
					$('#Tag__64 li').eq(2).addClass('-crt')
				}, 'json')
			}
		}
	});
}, 1000)
// 		'json');
// }, 'json');
