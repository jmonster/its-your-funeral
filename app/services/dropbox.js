import Ember from 'ember';
const { ajax } = Ember.$;

export default Ember.Service.extend({

  token: null,

  // Retrieves information about the user's account.
  info: function () {

    const uri = 'https://api.dropboxapi.com/1/account/info';
  },

  // Downloads a file.
  files: function (token, path, options) {

    const uri = `https://content.dropboxapi.com/1/files/auto/`;

    path = path || {};
    options = options || {};

    return ajax(uri, {
      dataType: 'json',
      data: options,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Retrieves file and folder metadata.
  metadata: function (token, path, options) {

    const uri = `https://api.dropboxapi.com/1/metadata/auto/${path}`;

    path = path || {};
    options = options || {};

    return ajax(uri, {
      dataType: 'json',
      data: options,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
});
