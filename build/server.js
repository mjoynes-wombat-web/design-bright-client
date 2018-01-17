'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dotenv$config$parsed = _dotenv2.default.config().parsed,
    _dotenv$config$parsed2 = _dotenv$config$parsed.HTTP_PORT,
    HTTP_PORT = _dotenv$config$parsed2 === undefined ? 80 : _dotenv$config$parsed2,
    _dotenv$config$parsed3 = _dotenv$config$parsed.HTTPS_PORT,
    HTTPS_PORT = _dotenv$config$parsed3 === undefined ? 437 : _dotenv$config$parsed3,
    STATUS = _dotenv$config$parsed.STATUS,
    _dotenv$config$parsed4 = _dotenv$config$parsed.HOST,
    HOST = _dotenv$config$parsed4 === undefined ? '0.0.0.0' : _dotenv$config$parsed4,
    PRIVATE_KEY_FILE = _dotenv$config$parsed.PRIVATE_KEY_FILE,
    CERTIFICATE_FILE = _dotenv$config$parsed.CERTIFICATE_FILE;

var app = (0, _express2.default)();

if (STATUS !== undefined) {
  app.use((0, _morgan2.default)(STATUS));
}

app.use((0, _compression2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../build/dist')));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../build/dist', 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../build/dist', 'index.html'));
});

_http2.default.createServer(function (req, res) {
  var hostname = req.headers.host.match(/:/g) ? req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
  var redirect = 'https://' + hostname + ':' + HTTPS_PORT + req.url;
  res.writeHead(301, { Location: redirect });
  res.end();
}).listen(HTTP_PORT, HOST);

_https2.default.createServer({
  key: _fs2.default.readFileSync(PRIVATE_KEY_FILE),
  cert: _fs2.default.readFileSync(CERTIFICATE_FILE)
}, app).listen(HTTPS_PORT, HOST, function () {
  console.log('Design Bright site running on ' + HOST + ':' + HTTPS_PORT + '.');
});

//# sourceMappingURL=server.js.map