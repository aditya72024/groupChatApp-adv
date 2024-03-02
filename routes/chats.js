const express = require('express');
const router = express.Router();
var chatsController = require('../controllers/chats');

var userauthentication = require('../middleware/auth');

router.post('/postMessage', userauthentication.authenticate, chatsController.postMessage);
router.get('/getChats/:groupId', userauthentication.authenticate, chatsController.getChats);
router.get('/getLastChatId/:groupId', userauthentication.authenticate, chatsController.getLastChatId);

module.exports = router;