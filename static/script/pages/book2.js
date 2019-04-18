var urlloc = window.location.href;
let urlarr = urlloc.split('?id=');
var id = urlarr[1];
$.get('/ajax/book?id=' + id, function (d, status) {
  if (status == 'success') {
    new Vue({
      el: '#app',
      data: d,
      methods: {
        readBook: function () {
          location.href = "/reader?id=" + id;
        }
      }
    });
  } 
  if(status=="error"){
    $.get('/ajax/bookid?id='+id,function(d,status){
      console.log('get');
      new Vue({
        el: '#app',
        data: d,
        methods: {
          readBook: function () {
            location.href = "/reader?id=" + id;
          }
        }
      });
    },'json')
  }
}, 'json');
$.get('/ajax/bookid?id='+id,function(d,status){
  console.log('get');
  new Vue({
    el: '#app',
    data: d,
    methods: {
      readBook: function () {
        location.href = "/reader?id=" + id;
      }
    }
  });
},'json')