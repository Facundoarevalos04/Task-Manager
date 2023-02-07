const jwt = require('jsonwebtoken');

module.exports = (payload) => jwt.sign(payload, process.env.JSON_WB,{
    expiresIn : '1h'
})