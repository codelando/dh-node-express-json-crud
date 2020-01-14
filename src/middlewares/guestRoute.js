const guest = (req, res, next) => {

    if (res.locals.isAuthenticated) {
        res.redirect('/usuarios/perfil');
    }

    next();
}

module.exports = guest;