import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(/*transition*/) {
    const dropboxToken = this.get('session.currentUser.dropboxToken');

    if (dropboxToken) {
      return this.transitionTo('slide-show');
    }
  },

  actions: {
    connectToDropbox: function (asyncBtn) {

      const currentUser = this.get('session.currentUser');
      const promise = new Ember.RSVP.Promise((resolve, reject) => {
        this.get('torii').open('dropbox-oauth2').then((authData) => {
          currentUser.set('dropboxUid', authData.authorizationToken.uid);
          currentUser.set('dropboxToken', authData.authorizationToken.access_token);
          currentUser.save().then(resolve);
        }, reject);
      });

      asyncBtn(promise);

      return promise;
    },

    disconnectFromDropbox: function (asyncBtn) {

      const currentUser = this.get('session.currentUser');
      const promise = new Ember.RSVP.Promise((resolve, reject) => {

        // revoke our access token
        Ember.$.ajax('https://api.dropboxapi.com/1/disable_access_token', {
          method: 'post',
          headers: { 'Authorization': `Bearer ${currentUser.get('dropboxToken')}` }
        })
        .then(() => {
          currentUser.set('dropboxUid', undefined);
          currentUser.set('dropboxToken', undefined);
          currentUser.save().then(resolve).catch(reject);
        })
        .fail(reject);
      });

      asyncBtn(promise);

      return promise;
    }
  }
});
