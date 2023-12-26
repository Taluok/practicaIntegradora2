import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from './models/userModel.js';
import { comparePassword } from './utils/passwordUtils.js';

// Configurar estrategia local
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                if (!comparePassword(password, user.password)) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Configurar estrategia jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'tu_secreto_jwt',
        },
        async (jwtPayload, done) => {
            try {
                const user = await UserModel.findById(jwtPayload.sub);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Estrategia para obtener usuario actual a través del token (jwt)
passport.use(
    'current',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req) => req.cookies.jwt,
            ]),
            secretOrKey: 'tu_secreto_jwt',
        },
        async (jwtPayload, done) => {
            try {
                const user = await UserModel.findById(jwtPayload.sub);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);