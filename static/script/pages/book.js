var id = "";
$.get('/ajax/book?id=' + id,function(d){
	new Vue({
	  el: '#app',
	  data: d,
	  methods: {
			readBook: function() {
				debugger
				location.href= "/reader?id="+id;
			}
		}
	});
},'json');