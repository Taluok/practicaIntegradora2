import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from 'passport';
import productsRouter from './routes/products.router.js';
import userRouter from './routes/user.router.js';
import viewRouter from './routes/views.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import './db/database.js';
import { MONGOATLAS } from './db/database.js';
import "./passport/jwt.js";

const app = express();

const mongoStoreOptions = {
    store: new MongoStoreInstance({
        mongoUrl: MONGOATLAS,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    },
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(session(mongoStoreOptions));

// Configuración de Passport para sesiones
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/', viewRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

// Ruta para obtener el usuario actual
router.get('/current', passport.authenticate('current', { session: false }), loginJwt);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));