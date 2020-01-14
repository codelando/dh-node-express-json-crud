const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const usersController = require('../controllers/usersController');
const userRoute = require('../middlewares/userRoute');
const guestRoute = require('../middlewares/guestRoute');

router.get('/', usersController.index);
router.get('/nuevo', guestRoute, usersController.create);
router.post('/',  upload.single('image'), usersController.store);
router.get('/ingresar', guestRoute, usersController.loginForm);
router.post('/ingresar', usersController.login);
router.get('/perfil', userRoute, usersController.profile);
router.get('/salir', usersController.logout);
router.get('/:id', usersController.show);

router.get('/:id/editar', usersController.edit);
router.put('/:id', upload.single('image'), usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;