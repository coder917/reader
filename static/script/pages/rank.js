$.get('/ajax/rank',function(d){
	for(var i=0;i< d.items.length;i++){
		d.items[i].description = d.items[i].description.split('\n');
	}
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