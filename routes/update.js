var express = require('express');
var router = express.Router();
const usersBL = require('../Models/usersBL');
const usersDAL = require('../DAL/usersDAL');


router.get('/:username', async function (req, res, next) {
    if (req.session.admin) {
        let users = await usersDAL.getUsers();
        let user = users.find(user => user.username == req.params.username);
        res.render('updateUser', { user: user });
    }
    else {
        res.redirect("/login")
    }
});

router.post('/:username', async function (req, res, next) {
    let obj = { username: req.body.username, password: req.body.password, date: req.body.date, transactions: req.body.transactions };
    await usersBL.updateUser(req.params.username, obj);
    res.redirect('/menu');
});
module.exports = router;