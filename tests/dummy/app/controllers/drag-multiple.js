import Controller from '@ember/controller';
import { isArray } from '@ember/array';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  posts: alias('model'),

  actions: {
    increaseRating(payload, options) {
      if (isArray(payload)) {
        payload.forEach(post => post.incrementProperty('rating', options.target.amount || 1));
      } else {
        payload.incrementProperty('rating', options.target.amount || 1);
      }
    },

    decreaseRating(payload, options) {
      if (isArray(payload)) {
        payload.forEach(post => post.decrementProperty('rating', options.target.amount || 1));
      } else {
        payload.decrementProperty('rating', options.target.amount || 1);
      }
    }
  }
});
