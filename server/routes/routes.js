var app = require('express');
var router = app.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fileController = require('../controllers/fileController.js');

router.post('/file/upload', multipartyMiddleware, fileController.upload);
router.get('*', function (req, res) {
  res.render('index.html', { user: req.user ? req.user : null });
});

module.exports = router;