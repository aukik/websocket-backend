var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //i want to emit socket here
  // io.emit('message', {message:"Hello World"});
  res.status(200).json({message:"Hello World"});
});

module.exports = router;
