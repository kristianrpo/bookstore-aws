const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

app.use('/images-book', express.static(path.join(__dirname, 'public/images-book')));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
