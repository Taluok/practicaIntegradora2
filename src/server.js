import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";
import { __dirname, mongoStoreOptions } from "./utils/utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import viewsRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
import newsRouter from './routes/news.routes.js';
import { reqLog } from './middlewares/reqLog.js';


const mainRouter = new MainRouter();
const app = express();

// Definir las opciones de Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Documentation",
            version: "1.0.0",
            description: "Documentation for your API",
        },
    },
    // Rutas a los archivos de rutas para que Swagger pueda leer las definiciones de los endpoints
    apis: ['./routes/*.js'], // Rutas donde se encuentran las definiciones de las API
};

// Generar la documentación de Swagger
const specs = swaggerJSDoc(options);

// Montar la interfaz de usuario de Swagger en la ruta '/docs'
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(session(mongoStoreOptions));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(cookieParser(config.SECRET_COOKIES));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/loggerTest', (req, res) => {
    logger.error("error en el endpoint de prueba");
    res.send("probando logger");
});
app.use('/api', mainRouter.getRouter());
app.use('/views', viewsRouter);
app.use(errorHandler);

app.use(reqLog);

app.use('/news', newsRouter);

const PORT = config.PORT;

app.listen(PORT, () => logger.info(`SERVER UP ON PORT: ${PORT}`));



