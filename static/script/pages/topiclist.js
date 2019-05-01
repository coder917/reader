$.get('/ajax/topiclist',function(d){
	
	new Vue({
	  el: '#app',
		data: d,
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