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

router.get('/', usersController.index);
router.get('/nuevo', usersController.create);
router.post('/',  upload.single('image'), usersController.store);
router.get('/:id', usersController.show);
router.get('/:id/editar', usersController.edit);
router.put('/:id', upload.single('image'), usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;