// Sticky header nav
//
// Toggles "nav-stuck" class to body as you scroll past element of class "nav-main"

export let $nav,
    $body,
    $window,
    navBottom,
    offset = 0,
    stuck = false,
    scrollTop,
    ticking;

const stickyNav = {

  // Init sticky headers
  init() {
    $body = $('body');
    $nav = $('.nav-main');
    $window = $(window);

    stickyNav.resizing();
    stickyNav.update();

    $window.off('scroll.stickyNav').on('scroll.stickyNav', stickyNav.scrolling);
    $window.off('resize.stickyNav').on('resize.stickyNav', stickyNav.resizing);
    $window.off('load.stickyNav').on('load.stickyNav', stickyNav.resizing);
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(stickyNav.update);
    }
    ticking = true;
  },

  // Update positions of sticky nav
  update() {
    ticking = false;
    if (navBottom <= scrollTop && !stuck) {
      $body.addClass('nav-stuck');
      stuck = true;
    }
    if (navBottom >= scrollTop && stuck) {
      $body.removeClass('nav-stuck');
      stuck = false;
    }
  },

  // Resizing
  resizing() {
    navBottom = $nav.outerHeight();
  },

  // Scrolling
  scrolling() {
    scrollTop = $window.scrollTop() + offset;
    stickyNav.requestTick();
  }

};

export default stickyNav
