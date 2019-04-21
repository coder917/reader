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
  if (status == "error") {
    $.get('/ajax/bookid?id=' + id, function (d, status) {
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
    }, 'json')
  }
}, 'json');
$.get('/ajax/bookid?id=' + id, function (d, status) {
  console.log('get');
  var obj = JSON.stringify(d.item)
  window.localStorage.setItem("ficiton_reader_" + id, obj);
  new Vue({
    el: '#app',
    data: d,
    methods: {
      readBook: function () {
        var obj = JSON.stringify(d.item)
        window.localStorage.setItem("ficiton_reader_" + id, obj);
        console.log(obj)
        location.href = "/reader?id=" + id;
      }
    }
  });
}, 'json')