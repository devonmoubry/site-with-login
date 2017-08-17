const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const app = express();

const users = [{username: 'dumbledore', password: 'sherbert-lemon'}];

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/', function (req, res) {
  res.render('login');
})

app.post('/login', function (req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  res.render('index');
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
