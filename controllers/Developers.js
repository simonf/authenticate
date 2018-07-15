'use strict';

var utils = require('../utils/writer.js');
var Developers = require('../service/DevelopersService');

module.exports.login = function login (req, res, next) {
    var login = req.swagger.params['login'].value;
    console.log(login)
    Developers.login(login)
	.then(function (response) {
	    console.log('Resolved with ' + response)
	    utils.writeJson(res, response);
	})
	.catch(function (err) {
	    console.log('Rejected with '+err)
	    utils.writeJson(res, utils.respondWithCode(err,'{}'));
	});
};

module.exports.refreshToken = function refreshToken (req, res, next) {
  var token = req.swagger.params['token'].value;
  Developers.refreshToken(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
