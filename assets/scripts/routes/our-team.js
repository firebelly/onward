// Our Team page js

export default {

  init() {
    let $body = $('body');
    let $window = $(window);
    let $modal = $('.modal');
    let $modalOverlay = $('.modal-overlay');
    let $modalContainer = $modal.find('.container');
    let modalOpen = false;

    // Keyboard-triggered functions
    $(document).keyup(function(e) {
      // Escape key
      if (e.keyCode === 27) {
        _closeModal();
      }
    }).on('click', '.modal a.close-modal', function(e) {
      // Clicking on "[X] Close" button
      e.preventDefault();
      _closeModal();
    }).on('click', 'body.modal-open', function(e) {
      // Clicking outside of modal closes modal
      let $target = $(e.target);
      // Make sure target inside modal content
      if (!$target.hasClass('text-wrap') && $target.parents('.text-wrap').length === 0) {
        _closeModal();
      }
    });

    // Team links to modals
    $('.person h3, .person figure').on('click', function(e) {
      e.preventDefault();
      let $person = $(this).parents('.person');
      let $modalContent = $person.find('.modal-content').html();
      $modalContainer.html($modalContent);
      $modalContainer.find('.text-wrap').append('<a href="#" class="close-modal"><svg class="icon sprite-close" aria-hidden="true"><use xlink:href="#sprite-close"/></svg> <span>Close</span></a>');
      $modal.velocity('stop').velocity({
          opacity: [1, 0],
        }, {
          duration: 500,
          display: 'block',
          complete: function() {
            $modal.addClass('-active');
            _disableScroll();
          }
        }
      )
      modalOpen = true;
      _toggleOverlay();
    });

    function _closeModal() {
      if (!modalOpen) {
        return;
      }
      modalOpen = false;
      $('.modal').removeClass('-active').velocity({
          opacity: [0, 1],
        }, {
          duration: 250,
          display: 'none',
          complete: function() {
          }
        }
      );
      _toggleOverlay();
      $body.removeClass('modal-open');
      _enableScroll();
    }

    function _toggleOverlay() {
      $modalOverlay.velocity({
          opacity: (modalOpen ? 1 : 0)
        }, {
          duration: 50,
          display: (modalOpen ? 'block' : 'none')
        });
    }

    function _disableScroll() {
      var st = $window.scrollTop();
      $body.attr('data-st', st);
      $body.addClass('no-scroll modal-open');
      $body.css('top', -st);
    }

    function _enableScroll() {
      $body.removeClass('no-scroll');
      $body.css('top', '');
      $window.scrollTop($body.attr('data-st'));
      $body.attr('data-st', '');
    }


  },

  finalize() {
    // JavaScript to be fired on the our team page, after the init JS
  },

};
