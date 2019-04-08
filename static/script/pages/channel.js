var url=window.location.href;
let urlarr=url.split('?id=');
console.log(urlarr);
var id=urlarr[1];
console.log(id)

$.get('/ajax/channel?id=' + id,function(d){
	new Vue({
	  el: '#app',
	  data: d
	});
},'json');
