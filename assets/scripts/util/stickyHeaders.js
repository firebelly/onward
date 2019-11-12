// Vertical sticky headers with push effect

export let $stickies = [],
    stickyTitles = [],
    $mainSticky,
    $target,
    offset = 20,
    scrollTop,
    targetHeight,
    ticking;

const stickyHeaders = {

  // Init sticky headers
  init() {
    if ($('.sticky-header').length) {
      $target = $(window);
      $mainSticky = $('.sticky-header.main .sticky-title');

      // Prepend 00, 01 to .sticky-titles
      $stickies = $('.sticky-header').each(function(i) {
        let titleNum = ('0' + i).slice(-2);
        let $title = $(this).find('.sticky-title');
        $title.prepend('<i>' + titleNum + '</i>');
      });

      stickyHeaders.setStickyPositions();

      $target.off('scroll.stickies').on('scroll.stickies', stickyHeaders.scrolling);
      $target.off('resize.stickies').on('resize.stickies', stickyHeaders.resizing);
      $target.off('load.stickies').on('load.stickies', stickyHeaders.resizing);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(stickyHeaders.update);
    }
    ticking = true;
  },

  // Update positions of sticky headers
  update() {
    ticking = false;
    let currentStickyTitle = stickyTitles[0];
    // Find current sticky section title based on scroll position
    $stickies.each(function(i) {
      if (this.getAttribute('data-originalPosition') <= scrollTop) {
        currentStickyTitle = stickyTitles[i];
      }
    });
    $mainSticky.html(currentStickyTitle);
  },

  // Recalculate positions/sizes
  setStickyPositions() {
    targetHeight = $target.height();
    $stickies.each(function(i) {
      let $this = $(this);
      // Cache title elements
      stickyTitles[i] = $this.find('.sticky-title').html();
      $this.attr('data-originalPosition', $this.offset().top);
    });
  },

  // Resizing
  resizing(event) {
    stickyHeaders.setStickyPositions();
  },

  // Scrolling
  scrolling(event) {
    scrollTop = $(event.currentTarget).scrollTop();
    stickyHeaders.requestTick();
  }

};

export default stickyHeaders
