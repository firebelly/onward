export default {
  init() {
    // JavaScript to be fired on all pages

    // Handle clicks on nav a elements
    $('.site-nav a').on('click', function(e) {
      var $this = $(this);
      var $li = $this.parents('li:first');
      var href = $this.attr('href');
      var hrefSplit = href.split('#');
      console.log($li);

      // Mobile support for ul.children, slide in/out child options
      if ($li.hasClass('dropdown')) {
        e.preventDefault();
        $('.site-nav li').not($li).removeClass('open');
        $li.toggleClass('open');
        return;
      }

      // Close mobile nav on click (if item just scrolls page down)
      $('body').removeClass('mobile-nav-open');

      // Just scroll down to section if anchor link on same page
      if (hrefSplit.length && page_at == hrefSplit[0] && hrefSplit[0] != '#') {
        e.preventDefault();
        e.target.blur();
        _scrollBody('#' + hrefSplit[1], 500);
      }
    });


  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
