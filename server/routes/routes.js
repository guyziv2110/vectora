var app = require('express');
var router = app.Router();

router.get('*', function (req, res) {
  res.render('index.html', { user: req.user ? req.user : null });
});

module.exports = router;