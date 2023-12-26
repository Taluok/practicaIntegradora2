import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.render('login');
});
router.get('/register', (req, res)=>{
    res.render('register');
});
router.get('/profile', (req, res)=>{
    const user = req.session.user;
    if (user) {
        const { first_name } = user;
        res.render('profile', { user, first_name });
    } else {
        res.redirect('/errorLogin');
    }
});
router.get('/errorRegister', (req, res)=>{
    res.render('errorRegister')
});
router.get('/errorLogin', (req, res)=>{
    res.render('errorLogin')
});


export default router;