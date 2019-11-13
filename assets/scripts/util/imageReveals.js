// Image reveal treatment as you scroll
//
// Fades and slides in images as they appear in the viewport

export let $reveals,
    activated = [],
    $window,
    windowHeight,
    scrollTop,
    ticking;

const imageReveals = {

  // Init sticky headers
  init() {
    if ($('.-reveal').length) {
      $window = $(window);
      $reveals = $('.-reveal');

      imageReveals.resize();
      imageReveals.update();

      $window.off('scroll.reveals').on('scroll.reveals', imageReveals.scrolling);
      $window.off('resize.reveals').on('resize.reveals', imageReveals.resize);
      $window.off('load.reveals').on('load.reveals', imageReveals.resize);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(imageReveals.update);
    }
    ticking = true;
  },

  // Update image reveal
  update() {
    ticking = false;
    scrollTop = $window.scrollTop();
    // Find current sticky section title based on scroll position
    $reveals.each(function(i) {
      if (this.getAttribute('data-originalPosition') <= (scrollTop + windowHeight - (windowHeight * 0.05)) && !activated[i]) {
        $(this).addClass('-active');
        activated[i] = 1;
      }
    });
  },

  // Resize, recalculate positions
  resize(event) {
    windowHeight = $window.height();
    $reveals.each(function(i) {
      let $this = $(this);
      $this.attr('data-originalPosition', $this.offset().top);
    });
  },

  // Scrolling
  scrolling(event) {
    imageReveals.requestTick();
  }

};

export default imageReveals
