import Ember from 'ember';
const { computed, on } = Ember;

export default Ember.Route.extend({

  dropbox: Ember.inject.service(),

  model: function () {

    const dropboxToken = this.get('session.currentUser.dropboxToken');

    return this.get('dropbox').metadata(dropboxToken, '/', {
      list: true,
      // include_media_info: true
    })
    .then((metadata) => {
      return metadata.contents.map((file) => file.path);
    });


    return files;
  }
});
