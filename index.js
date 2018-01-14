require('dotenv').config();

const port = process.env.PORT;
const db_url = process.env.DB_URL;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(db_url);
require('./app/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ // ttl: 14 * 24 * 60 * 60 -- 14 days, default
        url: `mongodb://${db_url}`,
        collection: 'sessions'
    })
})); // for production, should specify store: new RedisStore or new MongoStore
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

app.listen(port);