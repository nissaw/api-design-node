var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// lock down the right routes :)
// decode token middleware will try to find token and attach it to req.user
// getFreshUser finds and attachs the entire user object to req.user
router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
  .get(controller.get) // anyone can see all the users
  .post(controller.post) // anyone has to be able to sign up

router.route('/:id')
  .get(controller.getOne)
  // in front of this put req we might add some middleware to check req.params.id === req.user._id to
  // be sure that the user being updated is the same as the logged in user. some approaches get rid of
  // id routes and update users only off the /me routes
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = router;
