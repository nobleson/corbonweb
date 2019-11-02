var express = require('express');
var router = express.Router();
var   app     = express();
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS"); 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
     });
    
// Require controller modules.
var face  = require('../controllers/Face');

router.get('/getall', face.findAll);

// POST request for creating artisan.
router.post('/create', face.create);

// PUT request to update artisan.
router.put('/:faceId', face.update);

// DELETE request to delete artisan.
router.delete('/:faceId', face.delete);
// GET request to get one artisan.
router.get('/:faceId', face.findOne);

module.exports = router;