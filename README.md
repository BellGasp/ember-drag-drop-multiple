# ember-drag-drop-multiple
[![npm version](https://badge.fury.io/js/ember-table-data.svg)](https://badge.fury.io/js/ember-table-data)
[![Ember Observer Score](https://emberobserver.com/badges/ember-table-data.svg)](https://emberobserver.com/addons/ember-table-data)
[![Build Status](https://travis-ci.org/BellGasp/ember-table-data.svg?branch=master)](https://travis-ci.org/BellGasp/ember-table-data)
[![Code Climate](https://codeclimate.com/github/BellGasp/ember-table-data/badges/gpa.svg)](https://codeclimate.com/github/BellGasp/ember-table-data)

## Description
This Ember Addon exposes a component adding multiple selection functionalities to ember-drag-drop

## Installation

* `ember install ember-drag-drop-multiple`

## Docs

### Dragging multiple objects

_TODO_

Here's an example of how that would be accomplished:

```hbs
{{#draggable-object-target action=(action 'increaseRating')}}
  Drag here to increase rating
{{/draggable-object-target}}

<br>

{{#selectable-objects as |so|}}
  {{#each model as |post|}}
    {{#so.object content=post}}
      {{post.title}} [ Rating: {{post.rating}} ]
    {{/so.object}}
  {{/each}}
{{/selectable-objects}}
```

```javascript
import Ember from 'ember';

const { Controller, isArray } = Ember;

export default Controller.extend({
  actions: {
    increaseRating(payload, options) {
      if (isArray(payload)) {
        payload.map(post => post.incrementProperty('rating', 1));
      } else {
        payload.incrementProperty('rating', 1);
      }
    }
  }
});
```

### Change the drag image

If you wish to change the style of your `draggable-object` when it's being dragged, simply provide an element selector using the `dragImageSelector` property and the element will be set as the drag image.

```hbs
{{#draggable-object dragImageSelector=".drag-image"}}
    Drag Me
{{/draggable-object}}

<div class="drag-image">Drag Image</div>
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
