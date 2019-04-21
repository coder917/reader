$.get('/ajax/index', function (d) {
	var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	$('#app').css('width', windowWidth);
	var storage = window.localStorage;
	var array = new Array();
	var reg = /[1-9][0-9]*/g;
	for (var i = 0; i < storage.length; i++) {
		if (/\d+$/.test(storage.key(i))) {
			// array.push(storage.key(i).match(reg)[0]);
			// var getKey=storage.key(i).match(reg)[0];
			var getKey = storage.key(i);
			var getVal = localStorage.getItem(getKey);
			var jsonObj = JSON.parse(getVal);
			array.push(jsonObj)
		}
	}
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
			booklist: array,
			duration: 0,
			position: 0,
			header_duration: 0,
			header_position: 0,
			tab_1_class: 'Swipe-tab__on',
			tab_2_class: '',
			tabsex_1_class: 'tab__on',
			tabsex_2_class: '',
			fiction_id: '',
			timestamp: 0,
			timestamp2: 0,
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
			},
			touchin(index) {
				this.fiction_id = index;
				clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
				timestamp = (new Date()).getTime(); 
				console.log(timestamp);
				this.Loop = setTimeout(function () {
					$('#deleteConfirm').removeClass('-hide');
					$('#deleteConfirm').addClass('-show');
					$('#deleteConfirm').show();
				}.bind(this), 400);

			},
			cleartime(index) {
				this.fiction_id = index;
				// console.log(index)
				// 这个方法主要是用来将每次手指移出之后将计时器清零
				clearInterval(this.Loop);
				timestamp2 = (new Date()).getTime(); 
				console.log(timestamp2);
				if(timestamp2-timestamp<400){
					console.log(index)
					window.location.href="/reader?id="+this.fiction_id;
				}
				
			},
			cancel() {
				$('#deleteConfirm').removeClass('-show');
				$('#deleteConfirm').addClass('-hide');
				$('#deleteConfirm').hide();
			},
			confirm() {
				console.log(this.fiction_id)
				var id = this.fiction_id;
				for (var i = 0; i < storage.length; i++) {
					if (storage.key(i).search(id) != -1) {
						console.log(storage.key(i))
						storage.removeItem(storage.key(i));
					}
				}
				array.length=0;
				for (var i = 0; i < storage.length; i++) {
					if (/\d+$/.test(storage.key(i))) {
						
						// array.push(storage.key(i).match(reg)[0]);
						// var getKey=storage.key(i).match(reg)[0];
						var getKey = storage.key(i);
						var getVal = localStorage.getItem(getKey);
						var jsonObj = JSON.parse(getVal);
						array.push(jsonObj)
					}
				}
				console.log(array)
				$('#deleteConfirm').removeClass('-show');
				$('#deleteConfirm').addClass('-hide');
				$('#deleteConfirm').hide();

			}
		}
	});
}, 'json');