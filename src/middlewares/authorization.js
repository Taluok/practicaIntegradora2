// authorization.js

import jwt from 'jsonwebtoken';
import { UserModel } from '../persistence/daos/mongodb/users/user.model.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import config from '../config/config.js';

const SECRET_KEY = config.SECRET_KEY_JWT;

/**
 * Middleware para verificar si el usuario es administrador
 */
export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const user = await UserModel.findById(decodedToken.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'No estás autorizado para realizar esta acción.' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

/**
 * Middleware para verificar el token de autorización
 */
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado.' });
        }
        const decodedToken = jwt.verify(token, SECRET_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }
};

/**
 * Middleware para verificar si el usuario es premium
 */
export const isPremiumUser = async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const user = await UserModel.findById(userId);

        if (!user || user.role !== 'premium') {
            return res.status(403).json({ message: 'Acción permitida solo para usuarios premium.' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * Método para resetear la contraseña del usuario
 */
export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        sendPasswordResetEmail(email, resetToken);

        return res.status(200).json({ message: 'Correo electrónico para restablecer la contraseña enviado.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


