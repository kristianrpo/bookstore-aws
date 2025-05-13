const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use('/images-book', express.static('/mnt/nfs/uploads/book_images/'));

app.prepare().then(() => {
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = 4000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server listening on http://localhost:${port}`);
  });
});
