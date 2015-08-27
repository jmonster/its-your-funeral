import Ember from 'ember';
import _collection from 'lodash/collection';

const { computed, run } = Ember;
const { shuffle } = _collection;

export default Ember.Component.extend({
  classNames: ['slide-show'],
  attributeBindings: ['style'],
  style: computed('activeImage', function () {
    return `background: url('${this.get("activeImage")}') no-repeat center center fixed; background-size: cover; -webkit-transition: background-image 0.5s ease-in-out; transition: background-image 0.5s ease-in-out;`;
  }),

  shuffledImages: computed('images', function () {
    return shuffle(this.get('images'));
  }),

  numberOfImages: computed('images.@each', function () {
    return this.get('images').length;
  }),

  activeImageIndex: 0,
  nextImageIndex: computed('activeImageIndex', 'numberOfImages', function () {
    return (this.get('activeImageIndex') + 1) % this.get('numberOfImages');
  }),

  activeImage: computed('activeImageIndex', 'images', function () {
    return this.get('shuffledImages').objectAt(this.get('activeImageIndex'));
  }),

  nextImage: computed('nextImageIndex', 'images', function () {
    return this.get('shuffledImages').objectAt(this.get('nextImageIndex'));
  }),

  speed: 5000,
  runner: null,

  begin: function () {
    this.scheduleNextIteration();
  }.on('didInsertElement'),

  stop: function () {
    const runLater = this.get('runner');
    run.cancel(runLater);
    this.set('runner', null);
  }.on('willDestroyElement'),

  scheduleNextIteration: function () {
    const img = new Image();

    img.onload = () => {
      this.set('runner', run.later(this, () => {
        // increment active image index
        this.set('activeImageIndex', this.get('nextImageIndex'));

        // schedule next change
        const runLater = this.get('runner');
        run.cancel(runLater);
        this.set('runner', this.scheduleNextIteration());
      }, this.get('speed')));
    };

    img.src = this.get('nextImage');
  }
});
