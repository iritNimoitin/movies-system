var express = require('express');
var router = express.Router();

const usersDAL = require('../DAL/usersDAL');
const usersBL = require('../Models/usersBL');

router.get('/:username', async function (req, res, next) {
    if (req.session.admin) {
        await usersBL.deleteUser(req.params.username);
        res.render('deleteUser', { username: req.params.username });
    }
    else {
        res.redirect("/login")
    }
});

module.exports = router;

