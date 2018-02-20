import DraggableObjectTarget from 'ember-drag-drop/components/draggable-object-target';
import { isArray } from '@ember/array';

export default DraggableObjectTarget.extend({
  handlePayload: function(payload, event) {
    this._super(payload, event);

    var obj = this.get('coordinator').getObject(payload, { target: this });

    if (isArray(obj)) {
      obj.clear();
    }
  },
});
