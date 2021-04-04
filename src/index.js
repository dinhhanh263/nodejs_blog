const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 9999;

// Middleware for sort function
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');


//connection
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware by url
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//call middleware sort
app.use(SortMiddleware);

//app.use(bacbaoVe);

// Middleware function example http://localhost:9999/?ve=thuong
function bacbaoVe (req, res, next) {
    if(['thuong', 'vip'].includes(req.query.ve)) {
        req.face = 'Gach Gach Gach!!!';
        return next();
    }
    res.status(403).json({
        message: 'Access denied!!'
    });
}

// Middleware by json
app.use(express.json());

//HTTP Logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',

                }

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                        </a>`;
            }
        }
    }),
);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources/views'));
// console.log('PATH: ',path.join(__dirname, 'resources/views'));
//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


