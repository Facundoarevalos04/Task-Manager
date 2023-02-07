var express = require('express');
var router = express.Router();

const {profile} = require('../controllers/usersController');
const checktoken = require('../middlewares/checktoken');

/* /api/users*/
router.get('/profile', checktoken, profile);

module.exports = router;
