var express = require('express');
var router = express.Router();
const userDAL = require('../DAL/usersDAL');
const userBL = require('../Models/usersBL');
let today = new Date().toISOString().slice(0, 10)

router.get('/', async function (req, res, next) {
    if (req.session.admin) {
        res.render('addNew', { user: null });
    }
    else {
        res.redirect("/login")
    }
});

router.post('/addUser', async function (req, res, next) {
    let obj = { username: req.body.username, password: req.body.password, date: today, transactions: req.body.transactions };
    await userBL.addUSer(obj);
    res.redirect('/menu');
});
module.exports = router;