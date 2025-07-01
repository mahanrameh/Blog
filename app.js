const express = require("express");
const path = require("path");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const articleRoute = require("./routes/articleRoute");
const tagRoute = require("./routes/tagRoute");
const homeRoute = require("./routes/homeRoute");
const adminRoute = require("./routes/p-admin");



const app = express();


app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));
app.use('/fonts', express.static(path.resolve(__dirname, 'public/fonts')));
app.use('/Images', express.static(path.resolve(__dirname, 'public/Images')));

app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'views'));


app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/article', articleRoute);
app.use('/tag', tagRoute);
app.use('/p-admin', adminRoute);






module.exports = app;