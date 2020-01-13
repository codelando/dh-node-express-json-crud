const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const productsController = require('../controllers/productsController');

router.get('/', productsController.index);
router.get('/nuevo', productsController.create);
router.post('/',  upload.single('image'), productsController.store);
router.get('/:id', productsController.show);
router.get('/:id/editar', productsController.edit);
router.put('/:id', upload.single('image'), productsController.update);
router.delete('/:id', productsController.destroy);

module.exports = router;