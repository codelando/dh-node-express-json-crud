const auth = (req, res, next) => {
    res.locals.isAuthenticated = false;

    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;
    }

    console.log(req.url, '-->' , 'autenticado:' , (typeof req.session.user !== 'undefined'))

    next();
}

module.exports = auth;