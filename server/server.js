const nr = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Stores = require('./../db/models/storeMongo.js');

const app = express();
const port = process.env.PORT || 3003;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/restaurants', express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/restaurants/:id', (req, res) => {
  Stores.findOne(req.params.id)
    .then(data => res.send(data))
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.post('/api/restaurants/:id', (req, res) => {
  Stores.insertReview(req.body)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.listen(port, () => {
  console.log(`server running at PORT: ${port}`);
});
