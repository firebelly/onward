export default {
  init() {
    // JavaScript to be fired on the home page

    // Clone & fade in header logos on homepage
    let $homeHeader = $('.page-home .page-header');
    let $homeSvg = $homeHeader.find('.sprite-logo');
    $homeSvg.velocity({ opacity: 0 }, { duration: 0 });
    $homeHeader.find('.page-header-info').velocity({ opacity: 0, translateY: 15 }, { duration: 0 });
    let windowHeight = $(window).height();

    let clones = [];
    let fadeSpeed = 135;
    for (let i = 1; i < 5; i++) {
      clones[i] = $homeSvg.clone().addClass('clone clone-'+i).insertAfter($homeSvg).velocity({ opacity: 0 }, { duration: 0});
    }
    // Fade in main logo
    $homeSvg.velocity({ opacity: 1 }, {
      duration: (fadeSpeed*2),
      easing: 'ease-in'
    });
    // Fade each cloned logo in a "stamp. stamp." effect
    for (let i = 1; i < 5; i++) {
      clones[i].velocity({ opacity: 1 }, {
        duration: fadeSpeed,
        delay: (5-i) * (fadeSpeed*2),
        easing: 'ease-in'
      });
    }
    // Fade in footer image and text
    $homeHeader.find('.page-header-info').velocity({ opacity: 1, translateY: 0 }, {
      duration: (fadeSpeed*3),
      delay: fadeSpeed * Math.min(9, Math.floor(windowHeight/100)),
      easing: 'ease-out'
    });

    // Add logo clones to footer-outro
    let $footerClones = $('<div class="logos footer-clones"/>').prependTo($('.page-home .footer-outro'));
    let footerClones = [];
    for (let i = 1; i < 4; i++) {
      footerClones[i] = $homeSvg.clone().addClass('clone clone-'+i).appendTo($footerClones);
    }
  },

  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
