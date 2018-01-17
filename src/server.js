import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import fs from 'fs';
import http from 'http';
import https from 'https';
import compression from 'compression';

const { HTTP_PORT = 80, HTTPS_PORT = 437, STATUS, HOST = '0.0.0.0', PRIVATE_KEY_FILE, CERTIFICATE_FILE } = dotenv.config().parsed;

const app = express();

if (STATUS !== undefined) {
  app.use(logger(STATUS));
}

app.use(compression());
app.use(express.static(path.join(__dirname, '../build/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/dist', 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/dist', 'index.html'));
});

http.createServer((req, res) => {
  const hostname = (req.headers.host.match(/:/g)) ? req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
  const redirect = `https://${hostname}:${HTTPS_PORT}${req.url}`;
  res.writeHead(301, { Location: redirect });
  res.end();
}).listen(HTTP_PORT, HOST);

https.createServer({
  key: fs.readFileSync(PRIVATE_KEY_FILE),
  cert: fs.readFileSync(CERTIFICATE_FILE),
}, app).listen(HTTPS_PORT, HOST, () => {
  console.log(`Design Bright site running on ${HOST}:${HTTPS_PORT}.`);
},
);
