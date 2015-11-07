import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropbox-dropzone'],
  drop (event) {
    haltEvent(event);

    const dropbox = this.get('dropbox');
    const token = this.get('token');
    const file = event.dataTransfer.files[0];

    const xhr = dropbox.upload(token, `/${file.name}`, file);
    xhr.upload.addEventListener('load', (ev) => {
      console.log(file.name, ' uploaded successfully');
    });

    this.set('caption', '');
  },
  dragEnter (event) {
    haltEvent(event);
    this.set('caption', 'Release to upload files to Dropbox');
  },
  dragLeave (event) {
    haltEvent(event);
    this.set('caption', '');
  },
  dragOver: haltEvent,
  dragStart: haltEvent
});

function haltEvent(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}
