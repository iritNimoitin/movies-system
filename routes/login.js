var express = require('express');
// const session = require('express-session');
var router = express.Router();
let loginBL = require('../models/loginBL')


router.get('/', function (req, res, next) {
    res.render('login', { msg: " " });
});


router.post('/userdata', async function (req, res, next) {
    let isValid = await loginBL.isUserValid(req.body.username, req.body.password);
    req.session.username = req.body.username;
    if (isValid.valid) {
        req.session["authenticated"] = true;
        if (isValid.admin) {
            req.session.admin = true;
        } else {
            req.session.dailyActions = isValid.dailyAction;
            // req.session.userId = valid.id;
            // req.session.username = valid.username;
        }
        res.redirect('/menu');
    } else {
        res.render('login', { msg: 'name or passowrd are wrong ! ' })
    }


});

module.exports = router;