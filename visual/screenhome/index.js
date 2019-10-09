document.addEventListener('DOMContentLoaded', function () {
  M.Parallax.init(document.querySelectorAll('.parallax'));
  M.Pushpin.init(document.querySelectorAll('.pushpin'));
});

$('.pushpin-demo-nav').each(function () {
  var $this = $(this);
  var $target = $('#' + $(this).attr('data-target'));
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});


axios.get('https://www.instagram.com/explore/tags/analisboetasitegallery/?__a=1')
  .then(function (response) {

    return response.data.graphql.hashtag.edge_hashtag_to_media.edges;
  }).then(function (postsArray) {

    let itemArray = [];
    postsArray.forEach(element => {
      itemArray.push({
        imageURL: element.node.display_url,
        commentsURL: getComment(element.node)

      })
    });
    return itemArray;
  }).then(function (itemArray) {

    const row = document.querySelector('#gallery')

    row.innerHTML ="";
    itemArray.forEach(element => {
      row.innerHTML+=cardGenerator(element);
    });
  })

  function getComment(node){
      if(node.edge_media_to_caption.edges){
        return node.edge_media_to_caption.edges[0].node.text
      }else {
        return ""
      }
  }

function cardGenerator(item) {

  // <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  const cardHtml = `
  <div class="col s12 m6 l4">
    <div class="card medium">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${item.imageURL}">
      </div>
      <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${item.commentsURL}   <i class="material-icons right">close</i></span>
      </div>
    </div>
  </div>
  `
  return cardHtml;
}




