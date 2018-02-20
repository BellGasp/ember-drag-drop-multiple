import DraggableObject from 'ember-drag-drop/components/draggable-object';
import { isArray } from '@ember/array';
import { computed, set } from '@ember/object';
import { next } from '@ember/runloop';
import $ from 'jquery';

export default DraggableObject.extend({
  classNameBindings: ['selected'],

  selectable: false,
  dragImageSelector: null,
  dragImageXOffset: 0,
  dragImageYOffset: 0,

  payload: computed('selectable', 'selected', 'content', 'aggregatedContent.[]', function () {
    return this.get('selectable') && this.get('selected') ?
      this.get('aggregatedContent') :
      this.get('content');
  }),

  selected: computed('aggregatedContent.[]', 'content', function () {
    if (isArray(this.get('aggregatedContent'))) {
      return this.get('aggregatedContent').includes(this.get('content'));
    }
    return false;
  }),

  updateSelection() {},
  dragStartAction() {},
  draggingSortItem() {},
  dragEndAction() {},

  click() {
    if (this.get('selectable')) {
      this.get('updateSelection')(this);
    }
  },

  _setDragImage() {
    if (this.get('dragImageSelector')) {
      let xOffset = this.get('dragImageXOffset');
      let yOffset = this.get('dragImageYOffset');
      let selector = this.get('dragImageSelector');

      let htmlElement = $(selector)[0];

      if (!htmlElement) {
        /* eslint-disable-next-line no-console */
        console.warn(`Draggable Object: The provided \`dragImageSelector\` (${selector}) ` +
          'did not yield any HTML element, therefore no drag image was set.');
        return;
      }

      event.dataTransfer.setDragImage(htmlElement, xOffset, yOffset);
    }
  },

  _setIsDraggingObject(obj, value) {
    if (obj && typeof obj === 'object') {
      set(obj, 'isDraggingObject', value);
    }
    set(this, 'isDraggingObject', value);
  },

  /*
  dragStart is overwritten only for the payload and the drag image
  */
  dragStart(event) {
    this._setDragImage();

    if (!this.get('isDraggable') || !this.get('dragReady')) {
      return event.preventDefault();
    }

    let dataTransfer = event.dataTransfer;

    let obj = this.get('payload');

    let id = null;
    if (this.get('coordinator')) {
      id = this.get('coordinator').setObject(obj, { source: this });
    }

    dataTransfer.setData('Text', id);

    this._setIsDraggingObject(obj, true);

    let dragCoordinator = this.get('dragCoordinator');
    if (!dragCoordinator.get('enableSort') && dragCoordinator.get('sortComponentController')) {
      //disable drag if sorting is disabled this is not used for regular
      return event.preventDefault();
    } else {
      next(()=> {
        this.dragStartHook(event);
      });
      dragCoordinator.dragStarted(obj, event, this);
    }

    this.get('dragStartAction')(obj, event);
    if (this.get('isSortable')) {
      this.get('draggingSortItem')(obj, event);
    }
  },

  /*
    dragEnd is overwritten only to get the payload instead of content
  */
  dragEnd(event) {
    if (!this.get('isDraggingObject')) {
      return;
    }

    let obj = this.get('payload');

    this._setIsDraggingObject(obj, false);

    this.dragEndHook(event);
    this.get('dragCoordinator').dragEnded();
    this.get('dragEndAction')(obj, event);

    if (this.get('dragHandle')) {
      this.set('dragReady', false);
    }
  },

  actions: {
    /*
      selectForDrag is overwritten only to get the payload instead of content
    */
    selectForDrag() {
      var obj = this.get('payload');
      var hashId = this.get('coordinator').setObject(obj, { source: this });
      this.set('coordinator.clickedId', hashId);
    }
  }
});
