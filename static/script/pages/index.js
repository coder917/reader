
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
			data() {
				const that = this;
				return {
					imgIndex: 1,
					swiperOption: {
						//是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
						notNextTick: true,
						//循环
						loop: true,
						//设定初始化时slide的索引
						initialSlide: 0,
						//自动播放
						autoplay: {
							delay: 1500,
							stopOnLastSlide: false,
							/* 触摸滑动后是否继续轮播 */
							disableOnInteraction: false
						},
						//滑动速度
						speed: 800,
						//滑动方向
						direction: "horizontal",
						//小手掌抓取滑动
						grabCursor: true,
						on: {
							//滑动之后回调函数
							slideChangeTransitionStart: function() {
								/* realIndex为滚动到当前的slide索引值 */
								that.imgIndex= this.realIndex - 1;
							},
						},
						//分页器设置
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
							type: "bullets"
						}
					}
			 };
		},
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
					this.position = '-100vw';
					this.header_position = 'calc(50vw - 90px)';
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