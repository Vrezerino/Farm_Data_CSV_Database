export {};
const express = require('express');
const farmsRouter = require('../controllers/farmsController.ts');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.get('/farm/:name', farmsRouter.getFarm);
router.get('/all', farmsRouter.getAllData);
router.get('/allnames', farmsRouter.getFarms);
router.get('/reset', farmsRouter.farmsReset);
router.post('/create', upload.single('file'), farmsRouter.farmCreate);
router.delete('/delete', farmsRouter.farmsDelete);

module.exports = router;
