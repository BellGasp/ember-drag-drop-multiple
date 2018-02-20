import Component from '@ember/component';
import { A } from '@ember/array';
import layout from '../templates/components/selectable-objects';

export default Component.extend({
  layout,

  aggregatedContent: null,

  onKeyDown(e) {
    if (e.keyCode === 17) {
      this.set('enableMultipleSelection', true);
    }
  },

  onKeyUp(e) {
    if (e.keyCode === 17) {
      this.set('enableMultipleSelection', false);
    }
  },

  init() {
    this._super(...arguments);
    this.set('aggregatedContent', A());

    this.set('onKeyDown', this.get('onKeyDown').bind(this));
    this.set('onKeyUp', this.get('onKeyUp').bind(this));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    window.addEventListener('keydown', this.get('onKeyDown'), false);
    window.addEventListener('keyup', this.get('onKeyUp'), false);
  },


  actions: {
    updateSelection(draggableObject) {
      let selected = draggableObject.get('selected');
      let content = draggableObject.get('content');
      let enableMultipleSelection = this.get('enableMultipleSelection');

      if (enableMultipleSelection) {
        if (selected) {
          this.get('aggregatedContent').removeObject(content);
        } else {
          this.get('aggregatedContent').pushObject(content);
        }
      } else {
        this.set('aggregatedContent', A([
          content
        ]));
      }
    }
  }
});
