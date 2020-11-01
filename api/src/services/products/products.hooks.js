const { authenticate } = require('@feathersjs/authentication').hooks;
const filesStorage = require('../../hooks/file-storage')

function addTimestamp (context) {
  context.data.createdAt = Date.now()
} 

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [authenticate('jwt'), addTimestamp],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
