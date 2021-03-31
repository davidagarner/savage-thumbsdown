var review = document.getElementsByClassName("reviewButton");
// var thumbDown = document.getElementsByClassName("fa fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(review).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = this.closest(".book")
        const author = li.querySelector(".author").innerText
        const title = li.querySelector(".title").innerText
        const review = li.querySelector("#reviews").value
        fetch('review', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'author': author,
            'title': title,
            'review':review
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbDown':thumbDown
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = this.closest(".book")
        const author = li.querySelector(".author").innerText
        const title = li.querySelector(".title").innerText
    
        fetch('book', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'author': author,
            'title': title
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
