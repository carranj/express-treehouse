const express = require('express');
const bodyParser = require('body-parser');
const cookierParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookierParser());

app.set('view engine', 'pug');

app.use( (req, res, next) => {
    console.log("Hello");
    next();
});

app.use((req, res, next) => {
    console.log("World!");
    next();
});
 



app.get('/', (req , res) => {
    const name = req.cookies.username;
    name? res.render('index', {name}): res.redirect('/hello');
    
});

app.get('/cards', (req , res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb"});
});

app.get('/hello', (req , res) => {
    const name = req.cookies.username;
    !name ? res.render('hello') : res.redirect('/');
});

app.post('/hello', (req , res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req , res) => {
    res.clearCookie('username')
    res.redirect('/hello');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () =>{
    console.log("The application is running on localhost:3000!");
});