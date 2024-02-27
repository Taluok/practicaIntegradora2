import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/daos/mongodb/users/user.dao.js";
import 'dotenv/config';

const userDao = new UserMongoDao();
const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({msg: "User Unauthorized"});
    }
    try {
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, SECRET_KEY);
        console.log("Token decodificado");
        console.log(decode);
        const user = await userDao.getById(decode.userId);
        if (!user) {
            return res.status(400).json({msg: "User Unauthorized"});
        }
        req.user = user;
        next();
    } catch(error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({msg: "Token expired"});
        }
        return res.status(401).json({msg: "Invalid token"});
    }
};

export const isAdmin = (req, res, next) => {
    // Verificamos si el usuario está autenticado y si su rol es de administrador
    if (req.user && req.user.role === 'admin') {
        // Si el usuario es un administrador, permitimos que continúe con la siguiente función de middleware
        next();
    } else {
        // Si el usuario no es un administrador, devolvemos un mensaje de error y un código de estado 403 (Prohibido)
        return res.status(403).json({ message: 'Acceso denegado. Debes ser administrador para realizar esta acción.' });
    }
};


