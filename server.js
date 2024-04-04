const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

const sequelize = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.DB_SESS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },

  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/', async (req, res) => {
  res.render('home');
});

app.get('/login', async (req, res) => {
  res.render('login');
});

app.get('/landing', async (req, res) => {
  res.render('landing', {
    loggedIn: req.session.loggedIn,
  });
});

app.get('/upload', async (req, res) => {
  res.render('upload', {
    loggedIn: req.session.loggedIn,
  });
});

app.get('/logout', async (req, res) => {
  res.render('login');
});

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
