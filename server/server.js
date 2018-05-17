require('newrelic');
const fs = require('fs');
const fastify = require('fastify');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const Stores = require('./../db/models/store.js');

const app = fastify();
const port = process.env.PORT || 3003;

app.addHook('preHandler', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/restaurants', serveStatic(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, '../public/index.html'));
  res.type('text.html').send(stream);
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

app.listen(port, '0.0.0.0', () => {
  console.log(`server running at PORT: ${port}`);
});
