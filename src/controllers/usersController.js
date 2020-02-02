const bcrypt = require('bcrypt');
const crypto = require('crypto');
const JsonModel = require('../models/jsonModel');

const usersModel = new JsonModel('users');
const userTokensModel = new JsonModel('userTokens');

const controller = {
    index: (req, res) => {
        let users = usersModel.all();
        res.render('users/index', { users });
    },
    show: (req, res) => {
        let user = usersModel.find(req.params.id);

        if (user) {
            res.render('users/detail', { user });
        } else {
            res.render('users/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El usuario que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }
    },
    create: (req, res) => {
        res.render('users/create');
    },
    store: (req, res) => {
        req.body.image = req.file ? req.file.filename : '';
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        usersModel.save(req.body);

        res.redirect('/');
    },
    loginForm: (req, res) => {
        res.render('users/login');
    },
    login: (req, res) => {
        let user = usersModel.findByField('email', req.body.email);
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                delete user.password;
                req.session.user = user;
                res.locals.user = req.session.user;
                                
                if (req.body.remember) {
                    // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
                    const token = crypto.randomBytes(64).toString('base64');
                    res.cookie('rememberToken', token, { maxAge: 1000 * 60 * 60 * 24 * 90 });
                    userTokensModel.save({ userId: user.id, token});
                }

                res.redirect('/usuarios/perfil');

            } else {
                res.render('users/404', { 
                    message: {
                        class: 'error-message',
                        title: 'Inválido',
                        desc: 'Los datos de acceso son inválidos.'
                    }
                });
            }
        } else {
            res.render('users/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El usuario que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }       
    },
    logout: (req, res) => {
        // Al hacer logout borramos todos las cookies activas
        let tokens = userTokensModel.findAllByField('userId', req.session.user.id);
        if (tokens) {
            tokens.forEach(token => {
                userTokensModel.destroy(token.id);
            });
        }

        // La otra opción sería solo borrar la que corresponda a esta sesión.
        // let token = userTokensModel.findByField('token', req.cookies.rememberToken);
        // if (token) { userTokensModel.destroy(token.id) }

        req.session.destroy();
        res.cookie('rememberToken', null, { maxAge: -1 });
        res.redirect('/');
    },
    profile: (req, res) => {
        let user = usersModel.find(req.session.user.id);
        res.render('users/detail', { user });
    },
    edit: (req, res) => {
        let user = usersModel.find(req.params.id);
        if (user) {
            res.render('users/edit', { user });
        } else {
            res.render('users/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El usuario que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        /* Si nos llega imagen guardamos esa, de lo contrario mantenemos la anterior */
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        usersModel.update(req.body);

        res.redirect('/usuarios/' + req.params.id);
    },
    destroy: (req, res) => {
        usersModel.destroy(req.params.id);
        res.redirect('/usuarios');
    },
}

module.exports = controller;