const express = require('express');
const router = express.Router();
var groupsController = require('../controllers/groups');

var userauthentication = require('../middleware/auth');

router.post('/createGroup', userauthentication.authenticate, groupsController.createGroup);
router.get('/getGroups', userauthentication.authenticate, groupsController.getGroups);
// router.get('/getChats', userauthentication.authenticate, chatsController.getChats);
router.get('/getLastGroupId', userauthentication.authenticate, groupsController.getLastGroupId);

router.post('/sendInvitation', userauthentication.authenticate, groupsController.sendInvitation);


module.exports = router;