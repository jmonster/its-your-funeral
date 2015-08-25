import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    connectToDropbox: function (asyncBtn) {

      const promise = new Ember.RSVP.Promise((resolve, reject)=> {
        this.get('torii').open('dropbox-oauth2').then((authData) => {

          resolve(authData);
        }, reject);
      });

      asyncBtn(promise);
      return promise;
    }
  }
});
