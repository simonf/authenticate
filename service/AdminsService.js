'use strict';
const jwt = require('jsonwebtoken')
const secret_key = 'simonrocks'

/**
 * validates a signed JWToken
 * Check the token is correctly signed 
 *
 * token String the token whose signature will be validated
 * no response value expected for this operation
 **/
exports.validateToken = function(token) {
    try {
	var decoded = jwt.verify(token, secret_key)
	console.log(decoded)
	} catch(e) {
	    console.log(e)
	}
    return new Promise(function(resolve, reject) {
	if(decoded) resolve(decoded)
	else reject(400)
    });
}

