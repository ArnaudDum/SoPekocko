const express = require('express');
const router = express.Router();
const controls = require('../controllers/controls');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, controls.getSauces);

router.get('/:id', auth, controls.getOneSauce);

router.post('/', auth, multer, controls.createSauce);

router.put('/:id', auth, multer, controls.modifySauce);

router.delete('/:id', auth, controls.deleteSauce);

router.post('/:id/like', auth, controls.sauceLikes);

module.exports = router;