// Vertical sticky headers with push effect

export let $stickies = [],
    stickyTitles = [],
    $mainSticky,
    $window,
    scrollTop,
    ticking;

const stickyHeaders = {

  // Init sticky headers
  init() {
    if ($('.sticky-header').length) {
      $window = $(window);
      $mainSticky = $('.sticky-header.main .sticky-title');

      // Prepend 00, 01 to .sticky-titles
      $stickies = $('.sticky-header').each(function(i) {
        let titleNum = ('0' + i).slice(-2);
        let $title = $(this).find('.sticky-title');
        $title.prepend('<i>' + titleNum + '</i>');
      });

      stickyHeaders.setStickyPositions();

      $window.off('scroll.stickies').on('scroll.stickies', stickyHeaders.scrolling);
      $window.off('resize.stickies').on('resize.stickies', stickyHeaders.resizing);
      $window.off('load.stickies').on('load.stickies', stickyHeaders.resizing);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(stickyHeaders.update);
    }
    ticking = true;
  },

  // Update sticky title
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
    scrollTop = $window.scrollTop();
    stickyHeaders.requestTick();
  }

};

export default stickyHeaders
