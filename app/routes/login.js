import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(transition) {
    const isAuthenticated = this.get('session.isAuthenticated');

    if (isAuthenticated) {
      // ensure Dropbox is linked
      const dropboxToken = this.get('session.currentUser.dropboxToken');
      if (!dropboxToken) {
        return this.transitionTo('dropbox');
      } else {
        return this.transitionTo('slide-show');
      }
    }
  }
});
