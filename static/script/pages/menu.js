var url = window.location.href;
let urlarr = url.split('?id=');
console.log(urlarr);
var id = urlarr[1];
console.log(id)

$.get('/ajax/menu?id=' + id, function (d) {
  new Vue({
    el: '#app',
    data: d,
    created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function () {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
    },
    methods: {
      tishi:function() {
        $("#msg").show();
        setTimeout('$("#msg").hide()', 1500);
      }
    }
  });
}, 'json');
