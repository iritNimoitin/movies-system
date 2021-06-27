var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    if (req.session.authenticated) {
        res.render('menu', { username: req.session.username });
    }
    else {
        res.redirect("/login")
    }
});

module.exports = router;