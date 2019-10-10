// import external dependencies
import Velocity from 'velocity-animate';

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import pageHome from './routes/home';

/** Populate Router instance with DOM routes */
const routes = new Router({
  common,
  pageHome,
});

// Vertical sticky headers with push effect
var stickyHeaders = (function() {

  var $stickies,
      $offset,
      $scrollTop,
      $ticking;

  // Init sticky headers
  var load = function(stickies, target, offset) {
    $offset = offset || 0;
    if (typeof stickies === 'object' && stickies instanceof $ && stickies.length > 0) {

      $stickies = stickies;
      _setStickyPositions();

      target.off('scroll.stickies').on('scroll.stickies', _scrolling);
      target.off('resize.stickies').on('resize.stickies', _resizing);
      target.off('load.stickies').on('load.stickies', _resizing);
    }
  };

  // Request update using requestAnimationFrame
  var _requestTick = function() {
    if(!$ticking) {
      requestAnimationFrame(_update);
    }
    $ticking = true;
  };

  // Update positions of sticky headers
  var _update = function() {
    $ticking = false;
    $stickies.each(function(i) {

      var $thisSticky = $(this),
          $stickyPosition = $thisSticky.data('originalPosition'),
          $newPosition,
          $nextSticky;

      if ($stickyPosition <= $scrollTop) {

        $newPosition = Math.max($offset, $scrollTop - $stickyPosition);
        $nextSticky = $stickies.eq(i + 1);
        if($nextSticky.length > 0) {
          $newPosition = Math.min($newPosition, ($nextSticky.data('originalPosition') - $stickyPosition) - $thisSticky.data('originalHeight'));
        }

      } else {
        $newPosition = $offset;
      }

      $thisSticky.find('.sticky-title').css('top', $newPosition + 'px');
    });
  };

  // Recalculate positions/sizes
  var _setStickyPositions = function() {
    $stickies.each(function() {
      var $thisSticky = $(this);
      $thisSticky
        .data('originalPosition', $thisSticky.offset().top)
        .data('originalHeight', $thisSticky.find('.sticky-title').outerWidth() + 10);
    });
  }

  // Resizing
  var _resizing = function(event) {
    _setStickyPositions();
  }

  // Scrolling
  var _scrolling = function(event) {
    $scrollTop = $(event.currentTarget).scrollTop() + $offset;
    _requestTick();
  };

  return {
    load: load
  };
})();
// Init sticky headers
stickyHeaders.load($('.sticky-header'), $(window), 20);

// Load Events
$(document).ready(() => routes.loadEvents());
