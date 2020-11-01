// Initializes the `madeins` service on path `/madeins`
const { Madeins } = require('./madeins.class');
const createModel = require('../../models/madeins.model');
const hooks = require('./madeins.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model
  };

  // Initialize our service with any options it requires
  app.use('/madeins', new Madeins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('madeins');

  service.hooks(hooks);
};
