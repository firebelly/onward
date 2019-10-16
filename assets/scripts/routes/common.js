import Flickity from 'flickity';

export default {
  init() {
    // JavaScript to be fired on all pages

    let $body = $('body');
    let pageAt = window.location.pathname;
    let isAnimating = false;
    let navOpen = false;

    // Mobile hamburger and X close icons toggle mobile nav
    $('.toggle-nav').on('click', function(e) {
      e.preventDefault();
      if (navOpen) {
        _closeNav();
      } else {
        _openNav();
      }
    });

    // $('.feedify').feedify();
    // console.log($('.feedify').find('.feedify-item'));

    // Story carousels with custom pagination
    $('.carousel').each(function() {
      var $this = $(this),
          $cells = $this.find('.cells'),
          $pagination = $this.find('.carousel-pagination'),
          $cellButtonGroup = $pagination.find('.cell-buttons'),
          $cellButtons = $cellButtonGroup.find('span');

      var flkty = new Flickity($cells[0], {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        contain: true
      });

      // update selected cellButtons
      flkty.on('select', function(index){
        // console.log(index);
        $cellButtons.removeClass('-active');
        $cellButtons.eq(index).addClass('-active');
      });

      // select cell on button click
      $cellButtonGroup.on('click', 'span', function(){
        var index = $(this).index();
        flkty.select(index);
      });
      // previous
      $this.find('.previous').on('click', function(){
        flkty.previous();
      });
      // next
      $this.find('.next').on('click', function(){
        flkty.next();
      });
    });

    // Keyboard navigation and esc handlers
    $(document).keyup(function(e) {
      // esc
      if (e.keyCode === 27) {
        _closeNav();
      }
    });

    // Init nav animation states
    _resetNav();

    // Dropdown \/ links to toggle children page nav
    $('.site-nav .toggle-dropdown').on('click', function(e) {
      e.preventDefault();
      var $li = $(this).parents('li:first');
      // Show/hide children
      $('.site-nav li').not($li).removeClass('open').find('ul.children').velocity('slideUp', { duration: 0 });
      $li.find('ul.children li span').velocity($li.hasClass('open') ? 'fadeOut' : 'fadeIn', {
        duration: 200,
        delay: ($li.hasClass('open') ? 0 : 150)
      });
      $li.find('ul.children').velocity($li.hasClass('open') ? 'slideUp' : 'slideDown', {
        duration: 200,
        complete: function() {
        }
      }, 'easeOutSine');
      $li.toggleClass('open');
    });

    // Handle clicks on nav a elements
    $('.site-nav a').on('click', function(e) {
      // Abort if not clicking directly on link
      if (e.target.tagName !== 'A') {
        return;
      }

      // Just hide nav and scroll up if already on page
      if ($(this).attr('href') === pageAt) {
        e.preventDefault();
        e.target.blur();
        _closeNav();
        _scrollBody($('#top'));
      }
    });

    // Reset velocity states for main & child nav elements
    function _resetNav() {
      $('.site-nav ul.children').velocity('slideUp', { duration: 0 });
      $('.site-nav ul.children span').velocity('fadeOut', { duration: 0 });
      navOpen = false;
    }

    // Close main and any child nav elements
    function _closeNav() {
      $('.site-nav li.open').removeClass('open');
      _resetNav();
      $('body').removeClass('nav-open');
    }
    function _openNav() {
      $('body').addClass('nav-open');
      navOpen = true;
    }

    // Scroll body to an element with velocity
    function _scrollBody(element, duration, delay) {
      isAnimating = true;
      element.velocity('scroll', {
        duration: duration,
        delay: delay,
        offset: 0,
        complete: function(elements) {
          isAnimating = false;
        }
      }, 'easeOutSine');
    }

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
