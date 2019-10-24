import Flickity from 'flickity';
require('flickity-imagesloaded');

import appState from '../util/appState';

export default {
  init() {
    // JavaScript to be fired on all pages

    let $body = $('body');
    let pageAt = window.location.pathname;

    _setCustomVhUnit();
    $(window).on('resize', _setCustomVhUnit);

    // Mobile hamburger and X close icons toggle mobile nav
    $('#hamburger-salad').on('click', function(e) {
      e.preventDefault();
      _openNav();
    });
    $('a.toggle-nav.close').on('click', function(e) {
      e.preventDefault();
      _closeNav();
    });

    // Story carousels with custom pagination
    $('.carousel').each(function() {
      var $this = $(this),
          $cells = $this.find('.cells'),
          $pagination = $this.find('.carousel-pagination'),
          $cellButtonGroup = $pagination.find('.cell-buttons'),
          $cellButtons = $cellButtonGroup.find('span');

      var flkty = new Flickity($cells[0], {
        prevNextButtons: false,
        imagesLoaded: true,
        pageDots: false,
        cellAlign: 'left'
      });

      // update selected cellButtons
      flkty.on('select', function(index){
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
    }).on('click', 'body.nav-open', function(e) {
      // Clicking outside of modal closes modal
      let $target = $(e.target);
      // Make sure target inside modal content
      if ($target.parents('.toggle-nav').length === 0 && !$target.hasClass('site-nav') && $target.parents('.site-nav').length === 0) {
        _closeNav();
      }
    });

    // Init nav animation states
    _resetNav();

    // Dropdown \/ links to toggle children page nav
    $('.site-nav .toggle-dropdown').on('click', function(e) {
      e.preventDefault();
      // Update custom vh unit
      _setCustomVhUnit();
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
          // Update custom vh unit
          _setCustomVhUnit();
        }
      }, 'easeOutSine');
      $li.toggleClass('open');
    });

    // Handle clicks on nav a elements
    $('.site-nav a').on('click', function(e) {
      // Abort if not clicking directly on link (or span inside link)
      if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
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
      appState.navOpen = false;
    }

    // Close main and any child nav elements
    function _closeNav() {
      if (!appState.navOpen) {
        return;
      }
      $('.site-nav li.open').removeClass('open');
      _resetNav();
      $body.removeClass('nav-open');
    }
    function _openNav() {
      $body.addClass('nav-open');
      appState.navOpen = true;
    }

    // Scroll body to an element with velocity
    function _scrollBody(element, duration, delay) {
      appState.isAnimating = true;
      $body.removeClass('nav-stuck');
      element.velocity('scroll', {
        duration: duration,
        delay: delay,
        offset: 0,
        complete: function(elements) {
          appState.isAnimating = false;
        }
      }, 'easeOutSine');
    }

    function _setCustomVhUnit() {
      // Get the viewport height and multiply it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
