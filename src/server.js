import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./config/connection.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config';

const mainRouter = new MainRouter();
const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 10000
        },
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URL,
            ttl: 10,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const persistence = process.env.PERSISTENCE;

if (persistence === 'MONGO') {
    try {
        await initMongoDB();
        console.log('MondoDB connection successful');
    } catch (error) {
        console.log(error, 'Error connecting to MongoDB')
    };
};

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`SERVER UP ON PORT: ${PORT}`));
