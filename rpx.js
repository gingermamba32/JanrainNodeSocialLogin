// This code sample shows how to make the auth_info API call using Node.js.

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');


var fs, http, https, querystring, _ref;

_ref = ['fs', 'http', 'https', 'querystring'].map(require), fs = _ref[0], http = _ref[1], https = _ref[2], querystring = _ref[3];

http.createServer(function(request, response) {
  switch (request.method) {
    case 'GET':
      return fs.readFile('./index.html', function(error, content) {
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        return response.end(content, 'utf-8');
      });
      //put this in post request....decide whether to use github pages or portfolio on heroku
    case 'POST':
      request.setEncoding('utf8');
      return request.on('data', function(chunk) {
        var query_params, token, url;
        token = querystring.parse(chunk)['token'];
        console.log("Recieved token: " + token);
        query_params = querystring.stringify({
          apiKey: '4b50ac91bee538c9060d345c94b8a8d5b6dca041',
          token: token
        });
        url = {
          protocol: "https:",
          host: "rpxnow.com",
          path: "/api/v2/auth_info?" + query_params
        };
        console.log(("Requesting URL: " + url.protocol + "://") + url.host + url.path);
        return https.get(url, function(res) {
          response.writeHead(200, {
            'Content-Type': 'text/javascript'
          });
          res.setEncoding('utf8');
          res.on('data', function(chnk) {
            response.write(chnk);
            return console.log(chnk);
          });
          return res.on('end', function() {
            return response.end();
          });
        });
      });
  }
}).listen(5000);

console.log('Server running at http://localhost:5000/');

