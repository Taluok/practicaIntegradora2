import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import { __dirname, mongoStoreOptions } from "./utils/utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import 'dotenv/config';
import viewsRouter from "./routes/views.router.js";
import logger from './logger.js';


const mainRouter = new MainRouter();
const app = express();

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', mainRouter.getRouter());
app.use('/views', viewsRouter);
app.use(errorHandler);

app.get('/loggerTest', (req, res) => {
    logger.debug('Debug message');
    logger.http('HTTP message');
    logger.info('Info message');
    logger.warning('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal message');
    res.send('Logs enviados');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);
});

