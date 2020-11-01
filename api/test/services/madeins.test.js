const assert = require('assert');
const app = require('../../src/app');

describe('\'madeins\' service', () => {
  it('registered the service', () => {
    const service = app.service('madeins');

    assert.ok(service, 'Registered the service');
  });
});
