var express = require('express');
// const session = require('express-session');
var router = express.Router();
let loginBL = require('../models/LoginBL');


router.get('/', function (req, res, next) {
    res.render('login', { msg: " " });
});


router.post('/userdata', async function (req, res, next) {
    let isValid = await loginBL.isUserValid(req.body.username, req.body.password);
    if (isValid.valid) {
        req.session.username = req.body.username;
        req.session["authenticated"] = true;
        if (isValid.admin) {
            req.session.admin = true;
        } else {
            req.session.maxDailyActions = isValid.maxDailyActions;
            req.session.dailyActions = isValid.dailyAction;
        }
        res.redirect('/menu');
    } else {
        res.render('login', { msg: 'name or password are wrong ! ' })
    }


});

module.exports = router;