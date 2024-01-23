import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';
import MongoStore from 'connect-mongo';
import 'dotenv/config';

export const __dirname = dirname(fileURLToPath(import.meta.url));

// Centralizar la configuración de variables de entorno
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URL = process.env.MONGO_URL;

// Configuración de almacenamiento de sesiones
export const mongoStoreOptions = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000,
    },
    store: new MongoStore({
        mongoUrl: MONGO_URL,
        ttl: 10,
    }),
};

// Crear hash de contraseña
export const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

// Validar contraseña
export const isValidPassword = (user, password) => {
    try {
        return bcryptjs.compareSync(password, user.password);
    } catch (error) {
        console.error('Error al validar contraseña:', error);
        return false;
    }
};

// Crear respuesta HTTP
export const createResponse = (res, statusCode, data) => res.status(statusCode).json({ data });
