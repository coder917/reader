var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	$('#app').css('width', windowWidth);
$.get('/ajax/topic',function(d){
	
	new Vue({
	  el: '#app',
    data: d,
    screen_width:windowWidth,
    double_screen_width: windowWidth * 2
	});
},'json');