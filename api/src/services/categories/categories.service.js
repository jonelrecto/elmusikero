// Initializes the `categories` service on path `/categories`
const { Categories } = require('./categories.class');
const createModel = require('../../models/categories.model');
const hooks = require('./categories.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model
  };

  // Initialize our service with any options it requires
  app.use('/categories', new Categories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('categories');
  service.publish(() => app.channel('anonymous', 'authenticated'));
  service.hooks(hooks);
};
