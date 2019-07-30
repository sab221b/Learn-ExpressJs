require('./models/db');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const EmployeeRoute = require('./routes/employee');

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Sab!')
});

app.use('/api/v1/employees', EmployeeRoute);

//Other routes here
app.get('*', function (req, res) {
    res.send('invalid URL.');
});

app.listen(PORT, () => {
    console.log('Express server running at port: ' + PORT);
});