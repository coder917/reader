var urlloc = window.location.href;
let urlarr = urlloc.split('?id=');
var id = urlarr[1];
var shelf=false;
var storage = window.localStorage;
var reg = /[1-9][0-9]*/g;
for (var i = 0; i < storage.length; i++) {
  if (/\d+$/.test(storage.key(i))) {   
    if(id==storage.key(i).match(reg)[0])
      shelf=true;
  }
}
// $.get('/ajax/book?id=' + id, function (d, status) {
//   if (status == 'success') {
//     new Vue({
//       el: '#app',
//       data: d,
//       methods: {
//         readBook: function () {
//           location.href = "/reader?id=" + id;
//         }
//       }
//     });
//   }
//   if (status == "error") {
//     $.get('/ajax/bookid?id=' + id, function (d, status) {
//       console.log('get');
//       new Vue({
//         el: '#app',
//         data: d,
//         methods: {
//           readBook: function () {
//             location.href = "/reader?id=" + id;
//           }
//         }
//       });
//     }, 'json')
//   }
// }, 'json');
$.get('/ajax/bookid?id=' + id, function (d, status) {
  console.log('get');
  var obj = JSON.stringify(d.item)
  // window.localStorage.setItem("ficiton_reader_" + id, obj);
  var vm = new Vue({
    el: '#app',
    data: {
      item: d.item,
      author_books: d.author_books,
      comment: d.comment.top_comment[0],
      created: new Date(parseInt(d.comment.top_comment[0].create_time) * 1000).toLocaleString().split(' ')[0].replace(/\//g, '-'),
      updated: new Date(parseInt(d.item.updated) * 1000).toLocaleString().split(' ')[0].replace(/\//g, '-'),
      score: d.item.score,
      shelf:shelf
    },
    methods: {
      readBook: function () {
        var obj = JSON.stringify(d.item)
        window.localStorage.setItem("ficiton_reader_" + id, obj);
        console.log(obj)
        location.href = "/reader?id=" + id;
      },
      addBook: function () {
        if ($('.book-add-text').text() == "加入书架") {
          window.localStorage.setItem("ficiton_reader_" + id, obj);
          $('.book-add-text').text("已在书架");
          $('.btn-group .add').css("color", "#626262");
          $('.btn-group .add').css("border-color", "#626262");
          $("#msg").show();
          setTimeout('$("#msg").hide()', 1500);
        }
      }
    },
    created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'))
        setTimeout(function () {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
    },
    computed: {
      grade: function () {
        console.log(this.score)
        var i = Math.round(this.score);
        $('.grade').addClass('grade' + i);
      }
    }
  });
  vm.grade
}, 'json')