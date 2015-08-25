import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  dropboxUid: DS.attr('number'),
  dropboxToken: DS.attr('string')
});
