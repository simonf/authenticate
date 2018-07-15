'use strict';
const jwt = require('jsonwebtoken')
const secret_key = 'simonrocks'
const options = {
    expiresIn: 60 * 15,
    issuer: 'simon'
}

var checkUnPw = function(username, password) {
    if(username=='simon' && password == 'simon') return {customer_id: 123}
    else return null
}

/**
 * login with a username and password
 * returns a signed JWT
 *
 * login Login 
 * returns Jwt
 **/
exports.login = function(login) {
    return new Promise(function(resolve, reject) {
	var payload = checkUnPw(login.name, login.password)
	if(payload) {
	    console.log('un/pw ok')
	    var response = {
		expires: new Date(new Date().getTime()+60*15*1000).toISOString(),
		token: jwt.sign(payload, secret_key, options)
	    }
	    console.log('Resolving '+JSON.stringify(response))
	    resolve(JSON.stringify(response))
	} else {
	    reject(401);
	}
  });
}


/**
 * refresh an existing JWT
 * Refresh an unexpired token 
 *
 * token String the existing token
 * returns Jwt
 **/
exports.refreshToken = function(token) {
  return new Promise(function(resolve, reject) {
      jwt.verify(token, secret_key, function(err, decoded) {
	  if(err) {
	      console.log(err)
	      reject(400)
	  } else {
	      console.log(decoded)
              var response = {
		  expires: new Date(new Date().getTime()+60*15*1000).toISOString(),
		  token: jwt.sign(decoded.payload, secret_key, options)
	      }
	      console.log('Resolving '+JSON.stringify(response))
	      resolve(JSON.stringify(response))
	      resolve(decoded)
	  }
      });
  });
}

