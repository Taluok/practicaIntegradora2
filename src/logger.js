import winston from 'winston';

// Definir los niveles de prioridad
const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
};

// Configuración de los transportes de Winston
const transports = [
    new winston.transports.Console({
        level: 'debug', // Solo mostrará logs de nivel debug en consola en entorno de desarrollo
    }),
    new winston.transports.File({
        filename: 'errors.log',
        level: 'error', // Solo logs de nivel error o superior serán enviados al archivo de errores
    }),
];

const logger = winston.createLogger({
    levels: levels,
    transports: transports,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    exitOnError: false // No terminar el proceso Node.js en caso de errores en el logger
});

// Exportar el logger para su uso en otros archivos
export default logger;