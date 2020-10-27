const router = require('express').Router();
const verifyController = require('../controllers/verifyController');

router.get('/getaccesscode', verifyController.CreateNewAccessCode);
router.get('/validateaccesscode', verifyController.ValidateAccessCode);

module.exports = router;