// import external dependencies
import 'jquery';
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

// Load Events
$(document).ready(() => routes.loadEvents());
