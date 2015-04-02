var app = require('express');
var router = app.Router();

router.post('/file/upload', fileController.upload);
router.get('*', function (req, res) {
  res.render('index.html', { user: req.user ? req.user : null });
});

module.exports = router;