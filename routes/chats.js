const express = require('express');
const router = express.Router();
var chatsController = require('../controllers/chats');

var userauthentication = require('../middleware/auth');

router.post('/postMessage', userauthentication.authenticate, chatsController.postMessage);
router.get('/getChats', userauthentication.authenticate, chatsController.getChats);

module.exports = router;