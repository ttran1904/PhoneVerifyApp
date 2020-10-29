const router = require('express').Router();
const verifyController = require('./controllers/verifyController');

router.get('/getcode', verifyController.CreateNewAccessCode);
router.get('/validatecode', verifyController.ValidateAccessCode);

module.exports = router;