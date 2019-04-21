var url=window.location.href;
let urlarr=url.split('?id=');
console.log(urlarr);
var id=urlarr[1];
console.log(id)

$.get('/ajax/catelist?id=' + id,function(d){
	new Vue({
	  el: '#app',
	  data: d
	});
},'json');