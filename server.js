const path = require('path');
const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
// import sequelize connection
const sequelize = require('./config/connection');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
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

app.get("/views/login.handlebars", async (req, res) => {
  res.render('login')
});

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
