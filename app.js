var express = require('express'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    ghostPortal = require('ghost-portal');

require('dotenv').load();
var ENV = process.env;

var app = express();

app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: ENV.MONGO_URL
  })
}));

app.use(ghostPortal({
  google: {
    clientID: ENV.GOOGLE_CLIENT_ID,
    clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    authURL: ENV.GOOGLE_AUTH_URL,
    callbackURL: ENV.GOOGLE_CALLBACK_URL,
    requiredDomains: [ENV.GOOGLE_REQUIRED_DOMAIN]
  }
}));

app.use(serveStatic('sites'));
app.use(serveIndex('sites'));

var port = Number(ENV.PORT || 8888);
app.listen(port, function() {
  console.log("Ghost Ring is listening on port " + port);
});
