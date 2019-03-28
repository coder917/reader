$.get('/ajax/index', function (d) {
	var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	$('#app').css('width', windowWidth);
	// debugger
	var offset = $($('.Swipe-tab_2').find('a')[0]).offset();
	var index_header_tab_width2 = offset.width;
	new Vue({
		el: '#app',
		data: {
			screen_width: windowWidth,
			double_screen_width: windowWidth * 2,
			index_header_tab_width: index_header_tab_width2,
			top: d.items[0].data.data,
			hot: d.items[1].data.data,
			recommend: d.items[2].data.data,
			female: d.items[3].data.data,
			male: d.items[4].data.data,
			free: d.items[5].data.data,
			topic: d.items[6].data.data,
			duration: 0,
			position: 0,
			header_duration: 0,
			header_position: 0,
			tab_1_class: 'Swipe-tab__on',
			tab_2_class: '',
			tabsex_1_class: 'tab__on',
			tabsex_2_class: ''
		},
		methods: {
			change: function (type) {

				var temp = this[type].splice(0, 3);
				this[type] = [].concat(this[type], temp);
				console.log(this[type])
			},
			changeRecommend: function (type, num) {
				// debugger
				if (num == 1) {
					var temp = this[type].splice(0, 5);
					temp.unshift(10, 0);
					Array.prototype.splice.apply(this[type], temp);


					console.log(this[type])



				} else {
					var temp = this[type].splice(15, 5);
					this[type] = [].concat(this[type], temp);
					console.log(this[type])

				}
			},
			tabSwitch: function (pos) {
				this.duration = 0.5;
				this.header_duration = 0.5;
				if (pos == 0) {
					this.position = 0;
					this.header_position = 0;
					this.tab_1_class = "Swipe-tab__on";
					this.tab_2_class = "";
				} else {
					this.position = (-windowWidth);
					this.header_position = index_header_tab_width2;
					this.tab_2_class = "Swipe-tab__on";
					this.tab_1_class = "";
				}
			},
			tabOnSwitch: function (pos) {

				if (pos == 0) {

					this.tabsex_1_class = "tab__on";
					this.tabsex_2_class = "";
					$($('.tab__bd').find($('.tab__wrap')[0])).css('display', 'block');
					$($('.tab__bd').find($('.tab__wrap')[1])).css('display', 'none');

				} else {

					this.tabsex_2_class = "tab__on";
					this.tabsex_1_class = "";
					$($('.tab__bd').find($('.tab__wrap')[1])).css('display', 'block');
					$($('.tab__bd').find($('.tab__wrap')[0])).css('display', 'none');
				}
			}
		}
	});
}, 'json');