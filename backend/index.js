const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Sent from server');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});
