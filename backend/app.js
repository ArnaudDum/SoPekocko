const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Ddos = require('ddos');
const ddos = new Ddos({burst: 10, limit: 15});
const helmet = require('helmet');
const xssClean = require('xss-clean');
const session = require('cookie-session');
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // Session d'une heure
const app = express();


const Routes = require('./routes/routes.js');
const UserRoutes = require('./routes/userRoutes.js');

const path = require('path');

mongoose.connect('mongodb+srv://DumAr:highjump@piquantecluster.2mtl4.mongodb.net/PiquanteCluster?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(ddos.express);

app.use(helmet());

app.use(xssClean());

app.use(session({
  name: '',
  keys: ['RandomKey1', 'RandomKey2'],
  cookie: {
    secure: true,
    httpOnly: true,
    path: 'foo/bar',
    expires: expiryDate
  }
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', Routes);
app.use('/api/auth', UserRoutes);

module.exports = app;