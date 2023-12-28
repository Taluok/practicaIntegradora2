export default class ViewsController {
    login(req, res) {
        res.render('login');
    };

    register(req, res) {
        res.render('register');
    };

    profile(req, res) {
        const user = req.session.user;
        if (user) {
            const { first_name } = user;
            res.render('profile', { user, first_name });
        } else {
            res.render('/views/errorLogin');
        }
    };

    errorRegister(req, res) {
        res.render('errorRegister');
    };

    errorLogin(req, res) {
        res.render('errorLogin');
    };
};