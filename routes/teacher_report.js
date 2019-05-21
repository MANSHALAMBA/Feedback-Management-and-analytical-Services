var express = require('express');

var router = express.Router();

/* GET aboutus page. */
router.get('/', function(req, res, next) {
  res.render('teacher_report', { title: 'teacher_report' });
});

module.exports = router;
