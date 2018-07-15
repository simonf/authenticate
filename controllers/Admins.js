'use strict';

var utils = require('../utils/writer.js');
var Admins = require('../service/AdminsService');

module.exports.validateToken = function validateToken (req, res, next) {
  var token = req.swagger.params['token'].value;
  Admins.validateToken(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (code) {
	utils.writeJson(res, utils.respondWithCode(code, '{}'));
    });
};
