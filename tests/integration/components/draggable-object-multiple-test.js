import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | draggable-object-multiple', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#draggable-object-multiple}}
        template block text
      {{/draggable-object-multiple}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
