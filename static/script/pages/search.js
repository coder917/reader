

$.get('/ajax/searchtag', function (d) {
	var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	$('#app').css('width', windowWidth);
	new Vue({
		el: '#app_search',
		data: {
			ads: d.ads,
			search: [],
			condition: true,
			empty: false,
			screen_width: windowWidth,
			double_screen_width: windowWidth * 2,
			duration: 0,
			position: 0,
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
		mounter() {
			window.search = this.search;
			window.doSearch = this.doSearch;
		},
		directives:{
			focus:{
				inserted:function(el){
					el.focus()
				}
			}
		},
		methods: {
			doSearch: function (e) {
				var s = $('#search_box').val();
				var _this = this;
				$.get('/ajax/search', {
					start:0,
					s:s,					
				}, function (d) {
					_this.condition = false;
					_this.search = d.items;
					if (_this.search.length == 0) {
						_this.empty = true;
					} else {
						_this.empty = false;
					}
				}, 'json')
			},
			searchTag: function (e) {
				// console.log(e)
				console.log(e.currentTarget.textContent);
				$('#search_box').val(e.currentTarget.textContent);
				this.doSearch();
				// console.log(e.currentTarget.innerHtml);
				// console.log(e.target.innerHtml);
			}
		}
	});
}, 'json');

// function search(e) {
// 	console.log($(e)[0].innerHTML);
// 	$('#search_box').val($(e)[0].innerHTML);
// 	doSearch;
// }