var url=window.location.href;
let urlarr=url.split('?id=');
console.log(urlarr);
var id=urlarr[1];
console.log(id)
var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	$('#app').css('width', windowWidth);
$.get('/ajax/topic?id='+id,function(d){
	
	new Vue({
	  el: '#app',
    data: d,
    screen_width:windowWidth,
		double_screen_width: windowWidth * 2,
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
},'json');