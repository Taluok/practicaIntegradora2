import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import UserController from "../controllers/user.controller.js";
import { checkAuthCookie } from "../middlewares/authJwtCookies.js"
import { uploader } from "../middlewares/uploder.js";
const controller = new UserController();
const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', verifyToken, controller.profile);
router.get('/profile-cookie', checkAuthCookie, controller.profile);
router.post('/reset-pass', verifyToken, controller.resetPassword);
router.put('/new-password', verifyToken, controller.updatePassword);
router.post('/documents', verifyToken, uploader.fields([{ name: 'profile' }, { name: 'product'}, { name: 'document'}]), controller.uploadDocuments);
export default router;



