// Initializes the `products` service on path `/products`
const { Products } = require('./products.class');
const createModel = require('../../models/products.model');
const hooks = require('./products.hooks');
const express = require('@feathersjs/express')
const Path = require('path')
const multer = require('multer')
// const filters = require('../products.filters');
const multipartMiddleware = multer();

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/products');



const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    multi: true // allowing to store multiple instances of the model
  };
  app.use('/products', new Products(options, app))
  // app.use(
  //   '/products/upload', 
  //   upload.array('files'), 
  //   (req, _res, next) => {
  //     const { method } = req;
      
  //     if (method === 'POST' || method === 'PATCH') {
  //       // I believe this middleware should only transfer
  //       // files to feathers and call next();
  //       // and the mapping of data to the model shape
  //       // should be in a hook.
  //       // this code is only for this demo.
  //       // console.log(req, 'req')
  //       req.feathers.files = req.files; // transfer the received files to feathers
  //       // for transforming the request to the model shape
  //       const body = [];
  //       for (const file of req.files)
  //         body.push({
  //           description: req.body.description,
  //           orignalName: file.originalname,
  //           // destination: file.destination,
  //           newNameWithPath: file.path,
  //           // userId: req.user.id
  //         });
  //       req.body = method === 'POST' ? body : body[0];
  //     }
  //     next();
  //   },
  //   new Products(options, app)
  // );
  // app.use('/uploads', express.static(Path.join(__dirname, '/public/uploads')));
  // app.use('/products',
  // multipartMiddleware.array('files'),
  // function(req,res,next){
  //   console.log(req, 'req')
  //   req.feathers.file = req.file;
  //     next();
  // },
  // blobService({Model: blobStorage}),
  // new Products(options, app))
  
  // app.service('/products')


  // Get our initialized service so that we can register hooks
  const service = app.service('products');
  service.publish(() => app.channel('anonymous', 'authenticated'));
  service.hooks(hooks);
  // if (service.filter) {
  //   service.filter(filters)
  // }
};
