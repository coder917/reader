var id = "male";
$.get('/ajax/channel?id=' + id,function(d){
	new Vue({
	  el: '#app',
	  data: d
	});
},'json');