// import external dependencies
import Velocity from 'velocity-animate';

// import local dependencies
import Router from './util/Router';
import stickyHeaders from './util/stickyHeaders';
import stickyNav from './util/stickyNav';
import common from './routes/common';
import pageHome from './routes/home';
import childOurTeam from './routes/our-team';

/** Populate Router instance with DOM routes */
const routes = new Router({
  common,
  pageHome,
  childOurTeam,
});

// Init sticky headers
stickyHeaders.init();

// Init sticky nav
stickyNav.init();

// Load Events
$(document).ready(() => routes.loadEvents());
