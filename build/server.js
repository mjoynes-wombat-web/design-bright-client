import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import fs from 'fs';
import http from 'http';
import https from 'https';
import compression from 'compression';

var _dotenv$config$parsed = dotenv.config().parsed,
    _dotenv$config$parsed2 = _dotenv$config$parsed.HTTP_PORT,
    HTTP_PORT = _dotenv$config$parsed2 === undefined ? 80 : _dotenv$config$parsed2,
    _dotenv$config$parsed3 = _dotenv$config$parsed.HTTPS_PORT,
    HTTPS_PORT = _dotenv$config$parsed3 === undefined ? 437 : _dotenv$config$parsed3,
    STATUS = _dotenv$config$parsed.STATUS,
    _dotenv$config$parsed4 = _dotenv$config$parsed.HOST,
    HOST = _dotenv$config$parsed4 === undefined ? '0.0.0.0' : _dotenv$config$parsed4,
    PRIVATE_KEY_FILE = _dotenv$config$parsed.PRIVATE_KEY_FILE,
    CERTIFICATE_FILE = _dotenv$config$parsed.CERTIFICATE_FILE;


var app = express();

if (STATUS !== undefined) {
  app.use(logger(STATUS));
}

app.use(compression());
app.use(express.static(path.join(__dirname, '../build/dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/dist', 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/dist', 'index.html'));
});

http.createServer(function (req, res) {
  var hostname = req.headers.host.match(/:/g) ? req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
  var redirect = 'https://' + hostname + ':' + HTTPS_PORT + req.url;
  res.writeHead(301, { Location: redirect });
  res.end();
}).listen(HTTP_PORT, HOST);

https.createServer({
  key: fs.readFileSync(PRIVATE_KEY_FILE),
  cert: fs.readFileSync(CERTIFICATE_FILE)
}, app).listen(HTTPS_PORT, HOST, function () {
  console.log('Design Bright site running on ' + HOST + ':' + HTTPS_PORT + '.');
});

//# sourceMappingURL=server.js.map