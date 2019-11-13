// Our Team page js

// Shared vars among modules
import appState from '../util/appState';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default {

  init() {
    let $body = $('body');
    let $html = $('html');
    let $window = $(window);
    let $modal = $('.modal');
    let $modalOverlay = $('.modal-overlay');
    let $modalContainer = $modal.find('.inner');
    let modalOpen = false;

    // Sigh — duplicate content for mobile display only
    $('article.person').each(function() {
      let $social = $(this).find('ul.social').clone().removeClass('show-for-medium-up');
      $social.appendTo($(this).find('.person-body .inner')).addClass('hide-for-medium-up');
    });

    // Check for hash to open user
    if (window.location.hash) {
      let $person = $(`[data-person="${window.location.hash.replace('#','')}"]`);
      if ($person.length) {
        setTimeout(function() {
          _openPerson($person);
        }, 500);
      }
    }

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
      if (appState.isAnimating) {
        return;
      }
      let $person = $(this).parents('.person');
      _openPerson($person);
    });

    function _openPerson($person) {
      let $modalContent = $person.find('.modal-content').html();
      $modalContainer.html($modalContent);
      // Add close button
      $modalContainer.find('.text-wrap').append('<a href="#" class="close-modal"><svg class="icon sprite-close" aria-hidden="true"><use xlink:href="#sprite-close"/></svg> <span>Close</span></a>');
      // Set isAnimating to ignore any other triggers until modal is open
      appState.isAnimating = true;
      $modal.velocity('stop').velocity({
          opacity: [1, 0],
          translateY: [0, 15],
        }, {
          duration: 500,
          display: 'block',
          complete: function() {
            $body.addClass('modal-open');
            disableBodyScroll($('.modal .text-wrap .person-body')[0]);
            $html.css('overflow', 'hidden');
            appState.isAnimating = false;
          }
        }
      )
      modalOpen = true;
      _toggleOverlay();
    }

    function _closeModal() {
      if (appState.isAnimating || !modalOpen) {
        return;
      }
      modalOpen = false;
      $('.modal').velocity({
          opacity: [0, 1],
          translateY: [15, 0],
        }, {
          duration: 250,
          display: 'none',
          complete: function() {
            enableBodyScroll($('.modal .text-wrap .person-body')[0]);
            $html.css('overflow', '');
          }
        }
      );
      _toggleOverlay();
      $body.removeClass('modal-open');
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
