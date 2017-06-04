const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      controller = require('./controller'),
      secret = require('../secret.json');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: secret.secret,resave: true,saveUninitialized: true}));

app.post('/sms', (req, res) => controller.init(req, res))

http.createServer(app).listen(1337, () => {
  console.log("Express app listening on port 1337");
});