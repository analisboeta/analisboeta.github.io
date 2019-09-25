document.addEventListener('DOMContentLoaded', function() {
 M.Parallax.init(document.querySelectorAll('.parallax'));
 M.Pushpin.init(document.querySelectorAll('.pushpin'));
});

$('.pushpin-demo-nav').each(function() {
  var $this = $(this);
  var $target = $('#' + $(this).attr('data-target'));
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});
