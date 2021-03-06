var crypto = require('crypto')
  , qs = require('querystring')
  ;

function sha1 (key, body) {
  return crypto.createHmac('sha1', key).update(body).digest('base64')
}

function hmacsign (httpMethod, base_uri, params, consumer_secret, token_secret, body) {
  // adapted from https://dev.twitter.com/docs/auth/oauth
  var base = 
    httpMethod + "&" +
    encodeURIComponent(  base_uri ) + "&" +
    Object.keys(params).sort().map(function (i) {
      // big WTF here with the escape + encoding but it's what twitter wants
      return encodeURIComponent(qs.escape(i)) + "%3D" + encodeURIComponent(qs.escape(params[i]))
    }).join("%26")
  var key = consumer_secret + '&'
  if (token_secret) key += token_secret
  return sha1(key, base)
}

exports.hmacsign = hmacsign