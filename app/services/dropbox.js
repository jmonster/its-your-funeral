import Ember from 'ember';
const { ajax } = Ember.$;

export default Ember.Service.extend({

  token: null,

  // Retrieves information about the user's account.
  info: function () {

    // const uri = 'https://api.dropboxapi.com/1/account/info';
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
  },

  // v2 endpoint that loads the requested file
  download: function(token, path) {

    return ajax({
      method: 'post',
      url: 'https://content.dropboxapi.com/2/files/download',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Dropbox-API-Arg': JSON.stringify({"path":path})
      }
    });
  },

  // v1 endpoint to fetch URL for a file
  media: function (token, path) {

    const uri = `https://api.dropboxapi.com/1/media/auto/${path}`;

    path = path || {};

    return ajax(uri, {
      method: 'post',
      dataType: 'json',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // v2 endpoint to upload a file
  upload: function (token, path, file) {

    const params = {
      'path': path,
      'mode': 'add',
      'autorename': true,
      'mute': false
    };

    const xhr = new XMLHttpRequest();

    // optional call back to send progress % to
    const progressDidLoad = this.get('progressDidLoad');

    // using raw xhr in order to track progress
    xhr.upload.addEventListener('progress',function(ev){
      if (progressDidLoad) {
        progressDidLoad((ev.loaded/ev.total*100));
      }
    }, false);

    xhr.open('post', `https://content.dropboxapi.com/2/files/upload`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify(params));
    xhr.send(file);

    return xhr;
  }
});
