import Ember from 'ember';

export default Ember.Route.extend({

  dropbox: Ember.inject.service(),

  model: function () {

    const dropboxToken = this.get('session.currentUser.dropboxToken');

    return this.get('dropbox')
      .metadata(dropboxToken, '/', { list: true })
      .then((metadata) => {
        // collect file paths
        const paths = metadata.contents.map((file) => file.path);

        return Ember.RSVP.all(paths.map((path) => {

          // have to wrap the AJAX request in our own Promise
          // so that we don't `reject` on a 400 response
          return new Ember.RSVP.Promise((resolve, reject) => {

            this.get('dropbox')
                .media(dropboxToken, path)
                .fail((error) => { return resolve(null); })
                .done((media) => { return resolve(media.url); });
          });
        }))
        .then((paths) => {
          // remove null (failed) entries
          return paths.filter(p => p);
        });
      });
  }
});
