// Our Team page js

// Shared vars among modules
import appState from '../util/appState';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default {

  init() {
    let $body = $('body');
    let $window = $(window);
    let $modal = $('.modal');
    let $modalOverlay = $('.modal-overlay');
    let $modalContainer = $modal.find('.inner');
    let modalOpen = false;

    // Sigh
    $('article.person').each(function() {
      let $social = $(this).find('ul.social').clone().removeClass('show-for-medium-up');
      $social.appendTo($(this).find('.person-body .inner')).addClass('hide-for-medium-up');
    });

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
      if (appState.isAnimating) {
        return;
      }
      e.preventDefault();
      let $person = $(this).parents('.person');
      let $modalContent = $person.find('.modal-content').html();
      $modalContainer.html($modalContent);
      $modalContainer.find('.text-wrap').append('<a href="#" class="close-modal"><svg class="icon sprite-close" aria-hidden="true"><use xlink:href="#sprite-close"/></svg> <span>Close</span></a>');
      appState.isAnimating = true;
      $modal.velocity('stop').velocity({
          opacity: [1, 0],
        }, {
          duration: 500,
          display: 'block',
          complete: function() {
            $modal.addClass('-active');
            disableBodyScroll($('.modal .text-wrap .person-body')[0]);
            appState.isAnimating = false;
          }
        }
      )
      modalOpen = true;
      _toggleOverlay();
    });

    function _closeModal() {
      if (appState.isAnimating || !modalOpen) {
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
      enableBodyScroll($('.modal .text-wrap .person-body')[0]);
    }

    function _toggleOverlay() {
      $modalOverlay.velocity({
          opacity: (modalOpen ? 1 : 0)
        }, {
          duration: 50,
          display: (modalOpen ? 'block' : 'none')
        });
    }

  },

  finalize() {
    // JavaScript to be fired on the our team page, after the init JS
  },

};
