let express = require('express');
let router = express.Router();


router.get('/test', function(req, res)
{
    res.send('Test Route')
})



module.exports = router