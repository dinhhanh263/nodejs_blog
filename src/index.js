const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 9999;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware by url
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Middleware by json
app.use(express.json());

//HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources/views'));
// console.log('PATH: ',path.join(__dirname, 'resources/views'));
//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
