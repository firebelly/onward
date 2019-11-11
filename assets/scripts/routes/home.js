export default {
  init() {
    // JavaScript to be fired on the home page

    // Clone & fade in header logos on homepage
    var $homeHeader = $('.page-home .page-header');
    var $homeSvg = $homeHeader.find('.sprite-logo');
    $homeSvg.velocity({ opacity: 0 }, { duration: 0 });
    $homeHeader.find('.page-header-info').velocity({ opacity: 0 }, { duration: 0 });
    var clones = [];
    for (var i = 1; i < 5; i++) {
      clones[i] = $homeSvg.clone().addClass('clone clone-'+i).insertAfter($homeSvg).velocity({ opacity: 0 }, { duration: 0});
    }
    $homeSvg.velocity({ opacity: 1 }, { duration: 1500 });
    for (var i = 1; i < 5; i++) {
      clones[i].velocity({ opacity: 1 }, { duration: i * 500, delay: (5-i) * 250 });
    }
    $homeHeader.find('.page-header-info').velocity({ opacity: 1 }, { duration: 500, delay: 1500 });

    // Add logo clones to footer-outro
    var $footerClones = $('<div class="logos footer-clones"/>').prependTo($('.page-home .footer-outro'));
    var footerClones = [];
    for (var i = 1; i < 4; i++) {
      footerClones[i] = $homeSvg.clone().addClass('clone clone-'+i).appendTo($footerClones);
    }
  },

  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
