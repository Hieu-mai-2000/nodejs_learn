const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const app = express()
const port = 3000;
const route = require('./routes')
const db = require('./config/db/connect')
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const jwt = require('jsonwebtoken')
const helper = require('./util/helpersExpress')
const cookieParser = require('cookie-parser')

// use cookie 
app.use(cookieParser())
// connect to database
db.connect()

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Static file
app.use(express.static(path.join(__dirname, '/public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//cussom middleware
app.use(SortMiddleware)


// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('.hbs', handlebars({ 
        extname: '.hbs',
        helpers : helper,
    }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));


route(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

