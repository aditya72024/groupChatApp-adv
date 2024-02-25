const express = require('express');
const router = express.Router();
var chatsController = require('../controllers/chats');

var userauthentication = require('../middleware/auth');

router.post('/postMessage', userauthentication.authenticate, chatsController.postMessage);

module.exports = router;