var url = window.location.href;
let urlarr = url.split('?id=');
console.log(urlarr);
var id = urlarr[1];
console.log(id)

$.get('/ajax/rankitem?id=' + id, function (d) {
	new Vue({
		el: '#app',
		data: {
			items: d.items,
			id: id,
			labels: [{
					index: 11000,
					label: '男生畅销榜'
				},
				{
					index: 11010,
					label: '女生畅销榜'
				},
				{
					index: 12001,
					label: '男生人气榜'
				},
				{
					index: 12011,
					label: '女生人气榜'
				},
				{
					index: 13001,
					label: '男生新书榜'
				},
				{
					index: 13011,
					label: '女生新书榜'
				},
				{
					index: 14001,
					label: '男生飙升榜'
				},
				{
					index: 14011,
					label: '女生飙升榜'
				},
				{
					index: 15000,
					label: '男生完本榜'
				},
				{
					index: 15010,
					label: '女生完本榜'
				},
				{
					index: 23001,
					label: '男生热搜榜'
				},
				{
					index: 23011,
					label: '女生热搜榜'
				},
				{
					index: 16001,
					label: '豪门总裁榜'
				},
				{
					index: 17001,
					label: '穿越奇情榜'
				}, {
					index: 18002,
					label: '幻想仙侠榜'
				},
				{
					index: 19001,
					label: '都市榜'
				},
				{
					index: 20001,
					label: '玄幻榜'
				},
				{
					index: 21001,
					label: '灵异悬疑榜'
				},
				{
					index: 24003,
					label: '起点风云榜'
				},
				{
					index: 24013,
					label: '原创风云榜'
				},
				{
					index: 24113,
					label: '起点畅销榜'
				}
			]
		},
		created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
    },
	});
}, 'json');