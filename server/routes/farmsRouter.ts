export {};
const express = require('express');
const farmsRouter = require('../controllers/farmsController.ts');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.delete('/delete', farmsRouter.farmsDelete);
router.get('/reset', farmsRouter.farmsReset);
router.get('/all', farmsRouter.getAllData);
router.get('/allnames', farmsRouter.getFarms);
router.get('/farm', farmsRouter.getFarm);
router.post('/create', upload.single('file'), farmsRouter.farmCreate);

module.exports = router;
