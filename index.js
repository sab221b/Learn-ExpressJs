const express = require('express');
const app = express();
require('./models/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
const UserRoute = require('./routes/user');
const AuthRoute = require('./routes/auth');

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.use(session({ secret: "session" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1', (req, res) => {
    res.send({ message: 'Welcome to ExpressJS' })
});

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/auth', AuthRoute);


app.listen(PORT, () => {
    console.log('Express server running at port: ' + PORT);
});