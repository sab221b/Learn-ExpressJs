const express = require('express');
const app = express();
require('./models/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
const UserRoute = require('./routes/user');

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.use(session({ secret: "session" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1', (req, res) => {
    res.send({ message: 'Welcome to ExpressJS' })
    // res.cookie('name', 'express-cookie', { expire: 3600 + Date.now() });
    // if (req.session.page_views) {
    //     req.session.page_views++;
    //     res.send("You visited this page " + req.session.page_views + " times");
    // } else {
    //     req.session.page_views = 1;
    //     res.send("Welcome to this page for the first time!");
    // }
});

app.use('/api/v1/users', UserRoute);


app.listen(PORT, () => {
    console.log('Express server running at port: ' + PORT);
});