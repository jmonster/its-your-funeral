import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('slide-show');
  this.route('dropbox');
  this.route('uploader');
});

export default Router;
