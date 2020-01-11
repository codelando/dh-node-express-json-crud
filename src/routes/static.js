const express = require('express');
const router = express.Router();
const staticsController = require('../controllers/staticsController')

router.get('/', staticsController.index);
router.get('/acerca-de', staticsController.about);
router.get('/preguntas-frecuentes', staticsController.faq);

module.exports = router;