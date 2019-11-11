import Flickity from 'flickity';
require('flickity-imagesloaded');
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import appState from '../util/appState';

export default {
  init() {
    // JavaScript to be fired on all pages

    let $body = $('body');
    let $html = $('html');
    let pageAt = window.location.pathname;
    let $siteNav = $('.site-nav');

    // Mobile hamburger and X close icons toggle mobile nav
    $('#hamburger-salad').on('click', function(e) {
      e.preventDefault();
      _openNav();
    });
    $('.site-nav a').on('focus', function() {
      if (!appState.navOpen) {
        _openNav();
      }
    });
    $('a.toggle-nav.close').on('click', function(e) {
      e.preventDefault();
      _closeNav();
    });

    // Story carousels with custom pagination
    $('.carousel').each(function() {
      var $this = $(this),
          $cells = $this.find('.cells'),
          cellCount = $cells.find('.cell').length,
          $pagination = $this.find('.carousel-pagination'),
          $cellCounter = $pagination.find('.cell-count');

      var flkty = new Flickity($cells[0], {
        prevNextButtons: false,
        imagesLoaded: true,
        pageDots: false,
        selectedAttraction: 0.15,
        friction: 1,
        cellAlign: 'left'
      });

      // Update '01 / 05' text
      flkty.on('select', function(index){
        $cellCounter.text(('0' + (index+1)).slice(-2) + ' / ' + ('0' + cellCount).slice(-2));
      });

      // Previous
      $this.find('.previous').on('click', function(){
        flkty.previous();
      });
      // Next
      $this.find('.next').on('click', function(){
        flkty.next();
      });
    });

    // Keyboard navigation and esc handlers
    $(document).keyup(function(e) {
      // esc
      if (e.keyCode === 27) {
        _closeNav();
        // Unfocus any focused elements
        if (document.activeElement != document.body) {
          document.activeElement.blur();
        }
      }
    }).on('click', 'body.nav-open', function(e) {
      // Clicking outside of modal closes modal
      let $target = $(e.target);
      // Make sure target inside modal content
      if ($target.parents('.toggle-nav').length === 0 && !$target.hasClass('site-nav')  && !$target.hasClass('toggle-nav') && $target.parents('.site-nav').length === 0) {
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
        duration: 200
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
      // enableBodyScroll($siteNav[0]);
      $html.css('overflow', '');
    }
    function _openNav() {
      $body.addClass('nav-open');
      appState.navOpen = true;
      // disableBodyScroll($siteNav[0]);
      $html.css('overflow', 'hidden');
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

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
