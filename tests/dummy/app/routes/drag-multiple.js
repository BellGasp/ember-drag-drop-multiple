import Route from '@ember/routing/route';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return A([
      EmberObject.create({
        id: 1,
        title: 'Terrible Post',
        rating: 2
      }),
      EmberObject.create({
        id: 2,
        title: 'Bad Post',
        rating: 4
      }),
      EmberObject.create({
        id: 3,
        title: 'Decent Post',
        rating: 6
      }),
      EmberObject.create({
        id: 4,
        title: 'Good Post',
        rating: 8
      })
    ])
  },
});
