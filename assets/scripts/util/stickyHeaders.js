// Vertical sticky headers with push effect
export let $stickies,
    $stickyTitles = [],
    $offset,
    $scrollTop,
    $ticking;

const stickyHeaders = {

  // Init sticky headers
  load(stickies, target, offset) {

    $offset = offset || 0;
    if (typeof stickies === 'object' && stickies instanceof $ && stickies.length > 0) {

      $stickies = stickies;
      stickyHeaders.setStickyPositions();

      target.off('scroll.stickies').on('scroll.stickies', stickyHeaders.scrolling);
      target.off('resize.stickies').on('resize.stickies', stickyHeaders.resizing);
      target.off('load.stickies').on('load.stickies', stickyHeaders.resizing);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!$ticking) {
      requestAnimationFrame(stickyHeaders.update);
    }
    $ticking = true;
  },

  // Update positions of sticky headers
  update() {
    $ticking = false;
    $stickies.each(function(i) {

      let $this = $(this),
          $stickyPosition = $this.data('originalPosition'),
          $newPosition,
          $nextSticky;

      if ($stickyPosition <= $scrollTop) {

        $newPosition = Math.max($offset, $scrollTop - $stickyPosition);
        $nextSticky = $stickies.eq(i + 1);
        if($nextSticky.length > 0) {
          $newPosition = Math.min($newPosition, ($nextSticky.data('originalPosition') - $stickyPosition) - $this.data('originalHeight'));
        }

      } else {
        $newPosition = $offset;
      }

      $stickyTitles[i].css('top', $newPosition + 'px');
    });
  },

  // Recalculate positions/sizes
  setStickyPositions() {
    $stickies.each(function(i) {
      let $this = $(this);
      // Cache title elements
      $stickyTitles[i] = $this.find('.sticky-title');
      $this
        .data('title', $this.find('.sticky-title'))
        .data('originalPosition', $this.offset().top)
        .data('originalHeight', $this.find('.sticky-title').outerWidth() + 10);
    });
  },

  // Resizing
  resizing(event) {
    stickyHeaders.setStickyPositions();
  },

  // Scrolling
  scrolling(event) {
    $scrollTop = $(event.currentTarget).scrollTop() + $offset;
    stickyHeaders.requestTick();
  }

};

export default stickyHeaders
