require('./models/db');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const employeeController = require('./controllers/employeeController');

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('Express server running at port: ' + PORT);
});

app.get('/', (req, res) => {
    res.send('Hello Sab!')
});

app.use('/employee', employeeController);

