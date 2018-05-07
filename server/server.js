const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Stores = require('./../db/models/storePostgres.js');

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
    .catch(() => res.sendStatus(404));
});

app.get('/api/restaurants/:id', (req, res) => {
  Stores.insertOne(req.body)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
});

app.listen(port, () => {
  console.log(`server running at PORT: ${port}`);
});
