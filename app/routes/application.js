import Ember from 'ember';

export default Ember.Route.extend({
  firebase: Ember.inject.service(),

  beforeModel: function() {
    this.get('session').fetch().catch(() => {});
  },

  actions: {
    signUp: function(email, password) {
      const firebase = this.get('firebase');

      firebase.createUser({
        email: email,
        password: password
      }, (error, userData) => {
        if (error) {
          console.log('Error creating user:', error);
        } else {
          console.log('Successfully created user account with uid:', userData.uid);
          this.send('signIn', 'password', email, password);
        }
      });
    },

    signIn: function(provider, email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then((data) => {
        console.log('data: ',data);
      }, (err) => {
        console.error(err);
      });
    },
    
    signOut: function() {
      this.get('session').close();
    }
  }
});
