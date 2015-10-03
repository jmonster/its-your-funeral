import Ember from 'ember';

export default Ember.Route.extend({

  dropbox: Ember.inject.service(),

  model: function () {

    const dropboxToken = this.get('session.currentUser.dropboxToken');

    return this.get('dropbox').metadata(dropboxToken, '/', {
        list: true
      })
      .then((metadata) => {
        const paths = metadata.contents.map((file) => file.path);

        return Ember.RSVP.all(paths.map((path) => {
          return this.get('dropbox')
                     .media(dropboxToken, path)
                     .then((media) => media.url);
        }));
      });
  }
});
