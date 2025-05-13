import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './routes/router.js';
import './auth/localStrategy.js'; //import and run the file
import passport from 'passport';

const app = express();

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "e~IZ9|)Aw2E`26u1'I<cRt=g,?HQrZ",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

//configure passport...
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('views', 'views');
app.set('view engine', 'pug');

//load routers
app.use('/', router);

//error handling
app.use((err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message || "Unknown server error!";

    res.status(200).render('error', {
        status,
        message
    })
})

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});