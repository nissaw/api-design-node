var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./categoryController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// lock down the right routes :)
// route params is diff than getFreshUser b/c it doesn't always get a user - it gets whatever resource 
router.param('id', controller.params);

router.route('/')
  .get( controller.get)
  .post(checkUser, controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = router;
