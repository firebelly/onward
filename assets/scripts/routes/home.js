export default {
  init() {
    // JavaScript to be fired on the home page

    // Fade in logos on header
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
  },

  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
