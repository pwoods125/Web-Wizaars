const path = require('path');
const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');

const sequelize = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.DB_SESS,
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

const hbs = exphbs.create({})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", async (req, res) => {
  res.render('home')
});

app.get("/login", async (req, res) => {
  res.render('login')
});

app.get("/landing", async (req, res) => {
  req.session.loggedIn = true;
  res.render('landing')
});

app.get("/logout", async (req, res) => {
  res.render('login')
});

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
