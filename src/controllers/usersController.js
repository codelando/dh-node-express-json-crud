const JsonModel = require('../models/jsonModel');

const usersModel = new JsonModel('users');

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
        let userId = usersModel.save(req.body);

        res.redirect('/usuarios/' + userId);
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
        /* Si nos lleva imagen guardamos esa, de lo contrario mantenemos la anterior */
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