const JsonModel = require('../models/jsonModel');

const usersModel = new JsonModel('users');
const userTokensModel = new JsonModel('userTokens');

const locals = (req, res, next) => {
    // https://expressjs.com/es/4x/api.html
    // res.locals

    res.locals.isAuthenticated = false;

    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;
    } else if (req.cookies.rememberToken) {
        // Si existe el token en la colección entonces es válido
        let userToken = userTokensModel.findByField('token', req.cookies.rememberToken);
        if(userToken) {
            // Si encontramos un usuario que coincida, lo logeamos
            let user = usersModel.find(userToken.userId);
            if(user) {
                delete user.password;
                req.session.user = user;
                res.locals.isAuthenticated = true;
                res.locals.user = req.session.user;
            }
        }

        // Si no existe en la colección es inválido, borramos la cookie
        res.cookie('rememberToken', null, { maxAge: -1 });
    }

    next();
}

module.exports = locals;