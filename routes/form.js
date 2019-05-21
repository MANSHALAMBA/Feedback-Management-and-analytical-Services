var express = require('express');

var router = express.Router();

/* GET aboutus page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'FEEDBACK FORM' });
});

module.exports = router;
