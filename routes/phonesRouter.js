const {Router} = require('express');
const {phoneControllers} = require('./../controllers');
const {paginate} = require('../middleware');

const phonesRouter = Router();

//Main CRUD
phonesRouter.route('/')
.post(phoneControllers.createPhone)
.get(paginate.paginatePhones, phoneControllers.getAllPhones);

phonesRouter.route('/:id')
.get(phoneControllers.getPhoneById)
.patch(phoneControllers.updatePhoneById)
.delete(phoneControllers.deletePhoneById);

//Filters
phonesRouter.get('/year/:year', phoneControllers.getPhonesByYear);
phonesRouter.get('/older-than/:year', phoneControllers.getPhonesOlderThan);
phonesRouter.patch('/year/:year', phoneControllers.updatePhonesByYear);
phonesRouter.delete('/year/:year', phoneControllers.deletePhonesByYear);

module.exports = phonesRouter;